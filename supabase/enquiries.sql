-- Run this once in Supabase SQL Editor after the main schema.sql.
-- Visitors can submit enquiries. Only user IDs listed in admin_users can read or update them.

CREATE TABLE IF NOT EXISTS public.admin_users (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
GRANT SELECT ON public.admin_users TO authenticated;

DROP POLICY IF EXISTS "Admins can view their own admin entry" ON public.admin_users;
CREATE POLICY "Admins can view their own admin entry"
    ON public.admin_users
    FOR SELECT
    TO authenticated
    USING (user_id = (SELECT auth.uid()));

CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL CHECK (char_length(trim(name)) BETWEEN 1 AND 120),
    email TEXT NOT NULL CHECK (
        char_length(email) <= 254
        AND email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'
    ),
    phone TEXT NOT NULL CHECK (phone ~ '^\+91[6-9][0-9]{9}$'),
    subject TEXT NOT NULL DEFAULT 'General Inquiry' CHECK (char_length(subject) <= 120),
    message TEXT NOT NULL CHECK (char_length(trim(message)) BETWEEN 1 AND 5000),
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS enquiries_created_at_idx
    ON public.enquiries (created_at DESC);

ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
GRANT INSERT ON public.enquiries TO anon, authenticated;
GRANT SELECT, UPDATE ON public.enquiries TO authenticated;

DROP POLICY IF EXISTS "Anyone can submit a contact enquiry" ON public.enquiries;
CREATE POLICY "Anyone can submit a contact enquiry"
    ON public.enquiries
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can read contact enquiries" ON public.enquiries;
CREATE POLICY "Admins can read contact enquiries"
    ON public.enquiries
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.admin_users
            WHERE admin_users.user_id = (SELECT auth.uid())
        )
    );

DROP POLICY IF EXISTS "Admins can update contact enquiries" ON public.enquiries;
CREATE POLICY "Admins can update contact enquiries"
    ON public.enquiries
    FOR UPDATE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.admin_users
            WHERE admin_users.user_id = (SELECT auth.uid())
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.admin_users
            WHERE admin_users.user_id = (SELECT auth.uid())
        )
    );

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_publication_tables
        WHERE pubname = 'supabase_realtime'
          AND schemaname = 'public'
          AND tablename = 'enquiries'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.enquiries;
    END IF;
END $$;

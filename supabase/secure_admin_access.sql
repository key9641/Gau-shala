-- Run after schema.sql (and before deploying the admin portal).
-- Replaces the old policies that granted write access to every authenticated user.

CREATE TABLE IF NOT EXISTS public.admin_users (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.admin_users FROM PUBLIC, anon, authenticated;
GRANT SELECT ON public.admin_users TO authenticated;

DROP POLICY IF EXISTS "Admins can view their own admin entry" ON public.admin_users;
CREATE POLICY "Admins can view their own admin entry"
    ON public.admin_users
    FOR SELECT
    TO authenticated
    USING (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Public health records are viewable by everyone" ON public.health_records;

DROP POLICY IF EXISTS "Admin can modify cows" ON public.cows;
CREATE POLICY "Admin can modify cows" ON public.cows FOR ALL TO authenticated
    USING (EXISTS (SELECT 1 FROM public.admin_users au WHERE au.user_id = (SELECT auth.uid())))
    WITH CHECK (EXISTS (SELECT 1 FROM public.admin_users au WHERE au.user_id = (SELECT auth.uid())));

DROP POLICY IF EXISTS "Admin can modify breeds" ON public.breeds;
CREATE POLICY "Admin can modify breeds" ON public.breeds FOR ALL TO authenticated
    USING (EXISTS (SELECT 1 FROM public.admin_users au WHERE au.user_id = (SELECT auth.uid())))
    WITH CHECK (EXISTS (SELECT 1 FROM public.admin_users au WHERE au.user_id = (SELECT auth.uid())));

DROP POLICY IF EXISTS "Admin can modify health records" ON public.health_records;
CREATE POLICY "Admin can modify health records" ON public.health_records FOR ALL TO authenticated
    USING (EXISTS (SELECT 1 FROM public.admin_users au WHERE au.user_id = (SELECT auth.uid())))
    WITH CHECK (EXISTS (SELECT 1 FROM public.admin_users au WHERE au.user_id = (SELECT auth.uid())));

DROP POLICY IF EXISTS "Admin can modify missing cows" ON public.missing_cows;
CREATE POLICY "Admin can modify missing cows" ON public.missing_cows FOR ALL TO authenticated
    USING (EXISTS (SELECT 1 FROM public.admin_users au WHERE au.user_id = (SELECT auth.uid())))
    WITH CHECK (EXISTS (SELECT 1 FROM public.admin_users au WHERE au.user_id = (SELECT auth.uid())));

DROP POLICY IF EXISTS "Admin can modify sightings" ON public.sightings;
CREATE POLICY "Admin can modify sightings" ON public.sightings FOR ALL TO authenticated
    USING (EXISTS (SELECT 1 FROM public.admin_users au WHERE au.user_id = (SELECT auth.uid())))
    WITH CHECK (EXISTS (SELECT 1 FROM public.admin_users au WHERE au.user_id = (SELECT auth.uid())));

DROP POLICY IF EXISTS "Admin can modify donations" ON public.donations;
CREATE POLICY "Admin can modify donations" ON public.donations FOR ALL TO authenticated
    USING (EXISTS (SELECT 1 FROM public.admin_users au WHERE au.user_id = (SELECT auth.uid())))
    WITH CHECK (EXISTS (SELECT 1 FROM public.admin_users au WHERE au.user_id = (SELECT auth.uid())));

DROP POLICY IF EXISTS "Admin can modify settings" ON public.settings;
CREATE POLICY "Admin can modify settings" ON public.settings FOR ALL TO authenticated
    USING (EXISTS (SELECT 1 FROM public.admin_users au WHERE au.user_id = (SELECT auth.uid())))
    WITH CHECK (EXISTS (SELECT 1 FROM public.admin_users au WHERE au.user_id = (SELECT auth.uid())));

-- Create the administrator in Supabase Auth first, then allowlist that user's UUID:
-- INSERT INTO public.admin_users (user_id) VALUES ('<auth user UUID>');

-- GauSeva Gaushala Management & Donation Platform
-- Supabase PostgreSQL Schema Script with RLS policies and Seed Data

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. BREEDS TABLE
CREATE TABLE IF NOT EXISTS public.breeds (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    origin TEXT,
    description TEXT,
    characteristics TEXT,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. COWS TABLE
CREATE TABLE IF NOT EXISTS public.cows (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cow_id TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    breed_id UUID REFERENCES public.breeds(id) ON DELETE SET NULL,
    breed_name TEXT,
    age NUMERIC NOT NULL,
    gender TEXT NOT NULL DEFAULT 'Female',
    color TEXT,
    weight NUMERIC,
    photo_url TEXT,
    health_status TEXT NOT NULL DEFAULT 'healthy', -- 'healthy', 'under_observation', 'under_treatment', 'critical'
    location TEXT DEFAULT 'Shed A - Main Sanctuary',
    assigned_vet TEXT DEFAULT 'Dr. Rajesh Sharma (B.V.Sc)',
    last_checkup DATE DEFAULT CURRENT_DATE,
    next_checkup DATE DEFAULT (CURRENT_DATE + INTERVAL '30 days'),
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. HEALTH RECORDS TABLE
CREATE TABLE IF NOT EXISTS public.health_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cow_id UUID NOT NULL REFERENCES public.cows(id) ON DELETE CASCADE,
    health_status TEXT NOT NULL,
    diagnosis TEXT NOT NULL,
    treatment TEXT,
    veterinarian TEXT NOT NULL,
    checkup_date DATE NOT NULL DEFAULT CURRENT_DATE,
    next_checkup DATE,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. MISSING COWS TABLE
CREATE TABLE IF NOT EXISTS public.missing_cows (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cow_id UUID REFERENCES public.cows(id) ON DELETE CASCADE,
    cow_tag_id TEXT NOT NULL,
    cow_name TEXT NOT NULL,
    breed_name TEXT,
    age NUMERIC,
    color_marks TEXT,
    last_seen_location TEXT NOT NULL,
    last_seen_date DATE NOT NULL DEFAULT CURRENT_DATE,
    description TEXT,
    status TEXT NOT NULL DEFAULT 'missing', -- 'missing', 'sighted', 'found'
    reported_by TEXT NOT NULL,
    contact_number TEXT NOT NULL,
    photo_url TEXT,
    lat NUMERIC DEFAULT 26.9124,
    lng NUMERIC DEFAULT 75.7873,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. SIGHTINGS TABLE
CREATE TABLE IF NOT EXISTS public.sightings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cow_id UUID REFERENCES public.cows(id) ON DELETE SET NULL,
    missing_cow_id UUID REFERENCES public.missing_cows(id) ON DELETE CASCADE,
    reported_by TEXT NOT NULL,
    phone TEXT NOT NULL,
    location TEXT NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    description TEXT,
    photo_url TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. DONATIONS TABLE
CREATE TABLE IF NOT EXISTS public.donations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    donor_name TEXT NOT NULL,
    amount NUMERIC NOT NULL CHECK (amount > 0),
    transaction_id TEXT NOT NULL UNIQUE,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    message TEXT,
    verification_status TEXT NOT NULL DEFAULT 'pending', -- 'verified', 'pending', 'rejected'
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. ROW LEVEL SECURITY (RLS)
ALTER TABLE public.breeds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.missing_cows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sightings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Public Read Policies (Allow anyone to view Gaushala cows, breeds, missing reports)
CREATE POLICY "Public cows are viewable by everyone" ON public.cows FOR SELECT USING (true);
CREATE POLICY "Public breeds are viewable by everyone" ON public.breeds FOR SELECT USING (true);
CREATE POLICY "Public missing cows are viewable by everyone" ON public.missing_cows FOR SELECT USING (true);
CREATE POLICY "Public health records are viewable by everyone" ON public.health_records FOR SELECT USING (true);
CREATE POLICY "Public settings are viewable by everyone" ON public.settings FOR SELECT USING (true);

-- Public Insert Policies (Visitors can submit donation claims and sightings)
CREATE POLICY "Anyone can report a sighting" ON public.sightings FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can submit a donation claim" ON public.donations FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can view verified donations" ON public.donations FOR SELECT USING (true);

-- Admin Full Access Policies (Authenticated users can insert/update/delete)
CREATE POLICY "Admin can modify cows" ON public.cows FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can modify breeds" ON public.breeds FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can modify health records" ON public.health_records FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can modify missing cows" ON public.missing_cows FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can modify sightings" ON public.sightings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can modify donations" ON public.donations FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can modify settings" ON public.settings FOR ALL USING (auth.role() = 'authenticated');

-- 10. REALTIME CONFIGURATION
ALTER PUBLICATION supabase_realtime ADD TABLE public.cows;
ALTER PUBLICATION supabase_realtime ADD TABLE public.missing_cows;
ALTER PUBLICATION supabase_realtime ADD TABLE public.donations;

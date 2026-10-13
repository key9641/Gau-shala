-- Keep donor-submitted names and UPI reference numbers private until verified.
-- Run after schema.sql on projects where the old public donation policy exists.
DROP POLICY IF EXISTS "Public can view verified donations" ON public.donations;

CREATE POLICY "Public can view verified donations"
ON public.donations
FOR SELECT
USING (verification_status = 'verified');

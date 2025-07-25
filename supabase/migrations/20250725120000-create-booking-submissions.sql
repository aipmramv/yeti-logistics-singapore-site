-- Migration: Create booking_submissions table
CREATE TABLE IF NOT EXISTS public.booking_submissions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    email text NOT NULL,
    phone text,
    company text,
    service_type text,
    pickup_address text,
    delivery_address text,
    cargo_description text,
    special_requests text,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

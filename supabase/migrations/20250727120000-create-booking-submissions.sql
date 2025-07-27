-- Migration: Create booking_submissions table for booking requests
CREATE TABLE IF NOT EXISTS booking_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  name text,
  company text,
  email text,
  phone text,
  service_type text,
  pickup_address text,
  pickup_contact text,
  pickup_date timestamptz,
  delivery_address text,
  delivery_contact text,
  delivery_date timestamptz,
  cargo_description text,
  total_weight text,
  number_of_packages text,
  dimensions text,
  hazardous_cargo boolean,
  temperature_control boolean,
  special_requests text
);

-- Migration: Create testimonials table for admin panel
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  quote text,
  author text,
  company text,
  position text,
  display_order integer,
  is_active boolean DEFAULT true
);

-- Sample data
INSERT INTO testimonials (quote, author, company, position, display_order, is_active)
VALUES
('Yeti Logistics has consistently provided reliable, efficient, and professional delivery services.', 'Danny Yow', 'Cuisine Service Pte Ltd', 'Operation Manager', 1, true),
('Yeti has been a key partner in our operations. Their team handles challenges effortlessly.', 'Thomas', 'Le Petit Depot Pte Ltd', 'Warehouse Manager', 2, true);

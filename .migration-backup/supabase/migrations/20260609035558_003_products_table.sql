
/*
# Products Table for Water Tanks and Chainlink Fencing

1. New Tables
- `products`
  - `id` (uuid, primary key)
  - `name` (text, not null) — product name
  - `description` (text) — short product description
  - `category` (text, not null) — 'water_tanks' or 'chainlink_fencing'
  - `image_url` (text, not null) — product image
  - `price_label` (text) — e.g. "From KSh 12,000"
  - `created_at` (timestamptz)

2. Security
- Enable RLS on `products`.
- Allow public read (single-tenant, no auth).
*/

CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  image_url TEXT NOT NULL,
  price_label TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_products" ON products;
CREATE POLICY "select_products" ON products FOR SELECT
  TO anon, authenticated USING (true);

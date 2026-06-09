
/*
# Water Tanks & Chainlink Fencing Company Schema

1. New Tables
- `partners` — strategic partner companies for the infinite ticker
  - `id` (uuid, primary key)
  - `name` (text, not null)
  - `logo_url` (text, optional)
  - `created_at` (timestamptz)

- `gallery_items` — gallery images and videos for the gallery section
  - `id` (uuid, primary key)
  - `title` (text, not null)
  - `category` (text, not null) — 'water_tanks' or 'chainlink_fencing'
  - `media_type` (text, not null) — 'image' or 'video'
  - `url` (text, not null)
  - `thumbnail_url` (text, optional for videos)
  - `created_at` (timestamptz)

- `contact_submissions` — contact form submissions
  - `id` (uuid, primary key)
  - `name` (text, not null)
  - `email` (text, not null)
  - `phone` (text)
  - `country` (text)
  - `message` (text, not null)
  - `created_at` (timestamptz)

2. Security
- Enable RLS on all tables.
- Partners and gallery_items are public read (single-tenant, no auth).
- Contact submissions allow anon inserts.
*/

CREATE TABLE IF NOT EXISTS partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  logo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS gallery_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  media_type TEXT NOT NULL,
  url TEXT NOT NULL,
  thumbnail_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  country TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_partners" ON partners;
CREATE POLICY "select_partners" ON partners FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "select_gallery_items" ON gallery_items;
CREATE POLICY "select_gallery_items" ON gallery_items FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "insert_contact_submissions" ON contact_submissions;
CREATE POLICY "insert_contact_submissions" ON contact_submissions FOR INSERT
  TO anon, authenticated WITH CHECK (true);

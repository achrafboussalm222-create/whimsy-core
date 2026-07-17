-- ---------------------------------------------------------------------------
-- Whimsy Core — database setup
-- Run this once in your Supabase project: Dashboard -> SQL Editor -> New query
-- -> paste this whole file -> Run.
-- ---------------------------------------------------------------------------

-- 1. The products table -------------------------------------------------------
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  category text not null check (category in ('Bouquets', 'Plushies', 'Keychains', 'Gifts')),
  short_description text not null,
  description text not null,
  details text[] not null default '{}',
  images text[] not null default '{}',
  created_at timestamptz not null default now()
);

-- 2. Row-level security --------------------------------------------------------
-- Everyone (including visitors who aren't logged in) can READ products —
-- that's what makes the public website work. Only a signed-in admin can
-- write (insert/update/delete) — that's what makes the admin panel secure.
alter table products enable row level security;

create policy "Public can read products"
  on products for select
  using (true);

create policy "Signed-in users can insert products"
  on products for insert
  to authenticated
  with check (true);

create policy "Signed-in users can update products"
  on products for update
  to authenticated
  using (true);

create policy "Signed-in users can delete products"
  on products for delete
  to authenticated
  using (true);

-- 3. Realtime ------------------------------------------------------------------
-- Lets the live website instantly reflect admin changes without a page refresh.
alter publication supabase_realtime add table products;

-- ---------------------------------------------------------------------------
-- 4. Storage bucket for product photos
-- ---------------------------------------------------------------------------
-- Run this part too — it creates a public "product-images" bucket and sets
-- who can upload to it (same rule as above: read = everyone, write = signed-in
-- admin only).

insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

create policy "Public can view product images"
  on storage.objects for select
  using (bucket_id = 'product-images');

create policy "Signed-in users can upload product images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'product-images');

create policy "Signed-in users can update product images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'product-images');

create policy "Signed-in users can delete product images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'product-images');

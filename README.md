# Whimsy Core

A fully interactive React + TypeScript site for a handmade crochet brand, with
a password-protected admin panel for managing products — built with Vite,
Tailwind CSS, React Router, Framer Motion, and Supabase (database + storage +
login).

---

## Part 1 — One-time database setup (do this first)

The website's products live in a real database, not a code file, so the owner
can add/edit/delete them from the admin panel and see changes on the live
site immediately. You need a free Supabase project for this — takes about 5
minutes.

1. **Create a project**
   Go to [supabase.com](https://supabase.com), sign up (free), and click
   "New project". Pick any name and password (the password is for the
   database itself — save it somewhere, you likely won't need it again) and
   wait ~1 minute for it to finish setting up.

2. **Create the products table**
   In your new project, open the **SQL Editor** (left sidebar) → **New
   query**. Open `supabase/schema.sql` from this project, copy its entire
   contents, paste into the SQL editor, and click **Run**. This creates the
   `products` table, the security rules (public can view, only a logged-in
   admin can edit), a live-updates feed, and a storage bucket for photos.

3. **(Optional) Add starter products**
   Open `supabase/seed.sql`, copy it into a new SQL Editor query, and click
   **Run**. This fills the catalog with the original 10 placeholder products
   so the site isn't empty. Skip this step if you'd rather start from zero.

4. **Create your admin login**
   Go to **Authentication** → **Users** (left sidebar) → **Add user** →
   **Create new user**. Enter the email and password you want to log into
   `/admin` with, and make sure **"Auto Confirm User"** is checked. Click
   **Create user**. This is the *only* login the admin panel accepts — there's
   no public sign-up.

5. **Copy your API keys**
   Go to **Project Settings** (gear icon) → **API**. You'll need two values
   from this page in a moment: **Project URL** and the **anon public** key.

---

## Part 2 — Run the site

```bash
npm install
```

Then connect your project:

```bash
cp .env.example .env
```

Open `.env` in any text editor and paste in your **Project URL** and **anon
public** key from step 5 above:

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key-here
```

Save the file, then start the dev server:

```bash
npm run dev
```

Open the local URL it prints (usually `http://localhost:5173`) — that's your
site. Go to `http://localhost:5173/admin/login` and sign in with the email
and password you created in step 4 to manage products.

If you ever see a red banner at the top of the site saying the database isn't
connected, it means `.env` is missing or the dev server needs restarting
after you edited it (`Ctrl+C` then `npm run dev` again).

To build for production:

```bash
npm run build
npm run preview
```

---

## Editing content

- **Products** — manage them at `/admin` (add, edit, delete, upload photos).
  Every change appears on the public site immediately, no rebuild needed.
- **Contact details** — edit `src/config.ts` for your WhatsApp number,
  Instagram handle, and email. Every "Contact to Order" / WhatsApp /
  Instagram button on the site reads from here.
- **Colors & fonts** — defined in `tailwind.config.js` (cream / olive / gold
  / brown, Cormorant Garamond + Inter).

## What's included

- Password-protected `/admin` panel: add, edit, delete products, upload
  multiple photos per product, with a live product list
- All product data stored in a Supabase (Postgres) database — the public
  site updates in real time when the admin makes a change
- Dedicated product pages (`/product/:slug`) with animated route transitions
- Category filters + instant search on the Collection section
- Image gallery with carousel + full-screen lightbox on each product page
- Smooth-scroll section navigation, active-section nav highlighting, and a
  scroll progress bar
- Hover/lift animations on product cards, scroll-reveal animations, a
  cursor-reactive hero illustration, and a loading splash
- All "Contact to Order" buttons open a pre-filled WhatsApp chat — no cart,
  checkout, or payment anywhere, including in the admin panel

## Project structure

```
src/
  lib/            Supabase client + database read/write functions
  hooks/          useProducts — live-updating product list
  context/        AuthContext — admin login session
  components/     Reusable UI pieces (site + components/admin)
  pages/          Home, ProductPage, and pages/admin (login, dashboard, form)
supabase/
  schema.sql      Run once: creates the table, security rules, storage bucket
  seed.sql        Optional: the original 10 starter products
```

# Quick Start Guide - Anime Hub

Get your Anime Hub website up and running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- A Supabase account (free at supabase.com)

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Set Up Supabase

1. **Create Project**:
   - Go to [supabase.com](https://supabase.com)
   - Click "New Project"
   - Wait 2-3 minutes for setup

2. **Run Database Schema**:
   - In Supabase dashboard → **SQL Editor**
   - Copy contents of `supabase/schema.sql`
   - Paste and click **Run**

3. **Get API Keys**:
   - Go to **Settings** → **API**
   - Copy **Project URL** and **anon public** key

## Step 3: Configure Environment

Create `.env.local` in project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here
```

## Step 4: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Step 5: Test the Site

1. ✅ Home page loads
2. ✅ Click "Shop" to see posters
3. ✅ Filter by category
4. ✅ Click a poster for details
5. ✅ Add items to cart
6. ✅ Create account (Sign Up)
7. ✅ Login
8. ✅ View profile

## That's It! 🎉

Your Anime Hub is running locally. 

**Next Steps:**
- See `README.md` for detailed documentation
- See `DEPLOYMENT.md` for deploying to Vercel
- Customize colors in `tailwind.config.js`
- Add real images via Supabase Storage

## Troubleshooting

**"Missing environment variables" error?**
→ Make sure `.env.local` exists and has correct values

**"Cannot connect to Supabase" error?**
→ Check your API keys are correct

**Build errors?**
→ Run `npm install` again
→ Check Node.js version: `node --version` (should be 18+)

---

Need help? Check the full `README.md` for detailed instructions.



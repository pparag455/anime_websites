# ⚡ SETUP IN 2 MINUTES

## Step 1: Get Supabase Credentials (1 min)

1. Go to: https://supabase.com/dashboard
2. Click "New Project" (or use existing)
3. Wait 2-3 minutes for project to create 
4. Go to: **Settings** → **API**
5. Copy these two values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (long token)

## Step 2: Create .env.local File

**Option A - Quick Script:**
```bash
node setup-env.js
```

**Option B - Manual:**
Create `.env.local` in project root:
```env
NEXT_PUBLIC_SUPABASE_URL=your_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here
```

## Step 3: Set Up Database (30 seconds)

1. In Supabase dashboard → **SQL Editor**
2. Click **New Query**
3. Open `supabase/schema.sql` file
4. Copy ALL contents
5. Paste in SQL Editor
6. Click **Run** (or Ctrl+Enter)

## Step 4: Start Server

```bash
npm run dev
```

Open: http://localhost:3000

## ✅ DONE!

Your site should now work. Test:
- Home page loads
- Shop shows posters
- Can add to cart
- Can sign up/login

---

**Troubleshooting:**
- "Missing env variables" → Check .env.local exists
- "Connection error" → Verify Supabase URL/key are correct
- "No posters" → Make sure you ran schema.sql



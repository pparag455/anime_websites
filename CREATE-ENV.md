# ⚡ CREATE .env.local FILE NOW

The app needs Supabase credentials. Create `.env.local` file in the project root:

## Quick Method (Copy & Paste):

1. **Create file**: `.env.local` in project root (same folder as `package.json`)

2. **Add this content** (replace with YOUR values):

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## Get Your Supabase Credentials:

1. Go to: https://supabase.com/dashboard
2. **Create project** (or select existing)
3. Wait 2-3 minutes for setup
4. Go to: **Settings** → **API**
5. Copy:
   - **Project URL** → Replace `https://your-project-id.supabase.co`
   - **anon public** key → Replace `your-anon-key-here`

## After Creating .env.local:

1. **Restart dev server** (Ctrl+C then `npm run dev`)
2. **Run database schema**: 
   - Supabase Dashboard → SQL Editor
   - Copy `supabase/schema.sql` contents
   - Paste and click Run

## Windows PowerShell (Quick Create):

```powershell
@"
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
"@ | Out-File -FilePath .env.local -Encoding utf8
```

Then edit `.env.local` and replace with your actual values.

---

**The app won't work until you add real Supabase credentials!**



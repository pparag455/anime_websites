# 🚀 Vercel Deployment - Step by Step

## Quick Steps (5 minutes)

### Step 1: Push to GitHub (2 min)

1. **Initialize Git** (if not done):
```bash
git init
git add .
git commit -m "Anime Hub - Ready for deployment"
```

2. **Create GitHub Repository**:
   - Go to https://github.com/new
   - Repository name: `anime-hub` (or any name)
   - Make it **Public** or **Private**
   - **Don't** check "Initialize with README"
   - Click **"Create repository"**

3. **Push to GitHub**:
```bash
git remote add origin https://github.com/YOUR_USERNAME/anime-hub.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

---

### Step 2: Deploy on Vercel (2 min)

1. **Go to Vercel**:
   - Visit https://vercel.com
   - Click **"Sign Up"** or **"Log In"**
   - **Use GitHub** to sign in (recommended)

2. **Import Project**:
   - Click **"Add New..."** → **"Project"**
   - Click **"Import Git Repository"**
   - Find your `anime-hub` repository
   - Click **"Import"**

3. **Configure Project**:
   - **Framework Preset**: Next.js (auto-detected ✅)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)
   
   **Click "Deploy"** 🚀

4. **Wait for Build** (1-2 minutes):
   - Vercel will install dependencies
   - Build your Next.js app
   - Deploy to production
   - You'll see a progress log

---

### Step 3: Add Environment Variables (1 min)

**IMPORTANT**: Your site won't work without these!

1. **Go to Project Settings**:
   - After deployment, click **"Settings"** tab
   - Click **"Environment Variables"** in sidebar

2. **Add Variables**:
   Click **"Add New"** and add these **TWO** variables:

   **Variable 1:**
   - **Name**: `NEXT_PUBLIC_SUPABASE_URL`
   - **Value**: `https://kavptocjgrlfubxzczch.supabase.co`
   - **Environment**: Select all (Production, Preview, Development)
   - Click **"Save"**

   **Variable 2:**
   - **Name**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Value**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImthdnB0b2NqZ3JsZnVieHpjemNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzNTY4NjYsImV4cCI6MjA4NTkzMjg2Nn0.ttqS5Q80vn1VgmPVaDyK2IPuwqEvPINg5hnTg11sdJo`
   - **Environment**: Select all (Production, Preview, Development)
   - Click **"Save"**

3. **Redeploy**:
   - Go to **"Deployments"** tab
   - Click **"..."** (three dots) on latest deployment
   - Click **"Redeploy"**
   - Confirm redeploy

---

### Step 4: Configure Supabase (1 min)

1. **Get Your Vercel URL**:
   - After redeploy, copy your site URL
   - Example: `https://anime-hub-abc123.vercel.app`

2. **Update Supabase Redirect URLs**:
   - Go to: https://supabase.com/dashboard/project/kavptocjgrlfubxzczch
   - Click **"Authentication"** → **"URL Configuration"**
   - Under **"Redirect URLs"**, click **"Add URL"**
   - Add: `https://your-project.vercel.app/**`
   - Add: `https://your-project.vercel.app/auth/callback`
   - Under **"Site URL"**, change to: `https://your-project.vercel.app`
   - Click **"Save"**

---

## ✅ Done! Your Site is Live!

Visit your Vercel URL and test:
- ✅ Home page loads
- ✅ Anime posters display
- ✅ Can browse shop
- ✅ Can create account
- ✅ Can login
- ✅ Profile page works

---

## 🔧 Troubleshooting

### Build Fails?
- Check build logs in Vercel dashboard
- Make sure `package.json` has all dependencies
- Run `npm run build` locally first to test

### "Missing Environment Variables" Error?
- Go to Settings → Environment Variables
- Make sure both variables are added
- Select all environments (Production, Preview, Development)
- Redeploy after adding

### Authentication Not Working?
- Check Supabase redirect URLs are updated
- Make sure Site URL matches your Vercel URL
- Clear browser cache and try again

### Images Not Loading?
- Images come from external API (MyAnimeList)
- Check browser console for errors
- Should work automatically

---

## 📝 Your Deployment Info

- **Vercel URL**: `https://your-project.vercel.app`
- **Supabase Project**: `kavptocjgrlfubxzczch`
- **GitHub Repo**: `yourusername/anime-hub`

---

## 🎉 Next Steps

1. **Share your site** with friends!
2. **Custom Domain** (optional):
   - Vercel Dashboard → Settings → Domains
   - Add your domain
3. **Monitor**:
   - Check Vercel Analytics
   - Monitor Supabase usage

---

**Need help?** Check the full `DEPLOYMENT.md` for detailed troubleshooting.


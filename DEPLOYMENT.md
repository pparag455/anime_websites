# Deployment Guide - Anime Hub

## Quick Deployment Checklist

- [ ] Supabase project created and configured
- [ ] Database schema executed
- [ ] Environment variables set up locally
- [ ] Project tested locally (`npm run dev`)
- [ ] Code pushed to GitHub (optional)
- [ ] Vercel project created
- [ ] Environment variables added to Vercel
- [ ] Supabase redirect URLs updated
- [ ] Deployment successful

## Step-by-Step Deployment

### 1. Local Testing First

Before deploying, make sure everything works locally:

```bash
# Install dependencies
npm install

# Create .env.local with your Supabase credentials
# (See README.md for details)

# Run development server
npm run dev

# Test all features:
# - Home page loads
# - Shop page shows posters
# - Can filter by category
# - Can view poster details
# - Can add to cart
# - Can create account
# - Can login
# - Can view profile
```

### 2. Prepare for Deployment

#### Option A: Deploy from GitHub (Recommended)

1. **Initialize Git** (if not already done):
```bash
git init
git add .
git commit -m "Initial commit: Anime Hub"
```

2. **Create GitHub Repository**:
   - Go to GitHub.com
   - Click "New repository"
   - Name it `anime-hub` (or any name)
   - Don't initialize with README (you already have one)
   - Click "Create repository"

3. **Push to GitHub**:
```bash
git remote add origin https://github.com/yourusername/anime-hub.git
git branch -M main
git push -u origin main
```

#### Option B: Deploy from Local (Vercel CLI)

1. **Install Vercel CLI**:
```bash
npm i -g vercel
```

2. **Login to Vercel**:
```bash
vercel login
```

3. **Deploy**:
```bash
vercel
```

Follow the prompts. When asked about environment variables, you can add them later in the dashboard.

### 3. Deploy to Vercel (Web Dashboard)

1. **Go to Vercel**:
   - Visit [vercel.com](https://vercel.com)
   - Sign up/login (use GitHub for easy integration)

2. **Import Project**:
   - Click "Add New Project"
   - If using GitHub: Select your repository
   - If deploying from local: Use Vercel CLI (see above)

3. **Configure Project**:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - Click "Deploy"

4. **Add Environment Variables**:
   - After initial deployment, go to **Settings** → **Environment Variables**
   - Add these variables:
     ```
     NEXT_PUBLIC_SUPABASE_URL = your_supabase_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY = your_supabase_anon_key
     ```
   - Select **Production**, **Preview**, and **Development**
   - Click "Save"
   - Go to **Deployments** tab
   - Click the three dots on latest deployment → **Redeploy**

### 4. Configure Supabase for Production

1. **Update Redirect URLs**:
   - Go to Supabase Dashboard
   - Navigate to **Authentication** → **URL Configuration**
   - Add to **Redirect URLs**:
     ```
     https://your-project.vercel.app/**
     https://your-project.vercel.app/auth/callback
     ```
   - Add to **Site URL**:
     ```
     https://your-project.vercel.app
     ```

2. **Verify Email Settings** (Optional):
   - Go to **Authentication** → **Email Templates**
   - Customize templates if needed
   - Ensure email provider is enabled

### 5. Verify Deployment

1. **Visit Your Site**:
   - Go to `https://your-project.vercel.app`
   - Check all pages load correctly

2. **Test Features**:
   - [ ] Home page displays
   - [ ] Shop page shows posters
   - [ ] Can filter categories
   - [ ] Poster details page works
   - [ ] Can add items to cart
   - [ ] Cart persists
   - [ ] Can create account
   - [ ] Can login
   - [ ] Profile page accessible
   - [ ] Logout works

3. **Check Console**:
   - Open browser DevTools (F12)
   - Check Console for errors
   - Check Network tab for failed requests

## Common Deployment Errors

### Error: "Missing environment variables"

**Solution**:
1. Go to Vercel Dashboard → Settings → Environment Variables
2. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Redeploy the project

### Error: "Build failed"

**Solution**:
1. Check build logs in Vercel dashboard
2. Common issues:
   - Missing dependencies (check `package.json`)
   - Syntax errors (run `npm run build` locally first)
   - Environment variables not set

### Error: "Authentication redirect not working"

**Solution**:
1. Update Supabase redirect URLs (see step 4 above)
2. Clear browser cache
3. Try incognito mode

### Error: "Images not loading"

**Solution**:
1. Update `next.config.js` with your Supabase domain
2. Ensure images are publicly accessible
3. Check image URLs in Supabase Storage

### Error: "Database connection failed"

**Solution**:
1. Verify Supabase project is active
2. Check API keys are correct
3. Verify RLS policies are set correctly
4. Check Supabase dashboard for service status

## Post-Deployment

### Custom Domain (Optional)

1. Go to Vercel Dashboard → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update Supabase redirect URLs with new domain

### Analytics (Optional)

1. Vercel Analytics is available in dashboard
2. Can integrate Google Analytics if needed

### Monitoring

- Check Vercel dashboard for deployment status
- Monitor Supabase dashboard for database usage
- Set up error tracking (Sentry, etc.) if needed

## Rollback Deployment

If something goes wrong:

1. Go to Vercel Dashboard → Deployments
2. Find a previous working deployment
3. Click three dots → "Promote to Production"

## Performance Optimization

After deployment, consider:

1. **Image Optimization**:
   - Use Next.js Image component (already implemented)
   - Optimize image sizes before uploading

2. **Caching**:
   - Vercel handles caching automatically
   - Consider adding cache headers for static assets

3. **Database Indexing**:
   - Already set up in schema.sql
   - Monitor query performance in Supabase

## Support

If you encounter issues:

1. Check Vercel deployment logs
2. Check Supabase logs
3. Review browser console errors
4. Check Next.js documentation
5. Review Supabase documentation

---

**Your site should now be live! 🎉**

Share your deployed URL and celebrate your hard work!



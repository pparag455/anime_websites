# Anime Hub - Full-Stack Ecommerce Project

A production-ready anime posters shopping website built with Next.js, Tailwind CSS, and Supabase.

## 🚀 Features

- **Modern UI/UX**: Dark theme with anime-inspired design
- **Full Authentication**: User signup, login, and protected routes
- **Shopping Cart**: Persistent cart with quantity management
- **Product Catalog**: Browse and filter anime posters by category
- **Order Management**: View order history in user profile
- **Responsive Design**: Mobile-first, works on all devices
- **Production Ready**: Optimized for Vercel deployment

## 🛠️ Tech Stack

- **Next.js 14** (App Router)
- **React 18**
- **Tailwind CSS**
- **Supabase** (Auth + Database + Storage)
- **Zustand** (State Management)

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- npm or yarn package manager
- A Supabase account (free tier works)
- Git (optional, for version control)

## 🏗️ Project Setup

### Step 1: Create Next.js Project

If you're starting from scratch, create a new Next.js project:

```bash
npx create-next-app@latest anime-hub
cd anime-hub
```

However, if you already have this project cloned/downloaded, skip to Step 2.

### Step 2: Install Dependencies

Install all required packages:

```bash
npm install
```

This will install:
- Next.js and React
- Tailwind CSS and PostCSS
- Supabase client libraries
- Zustand for state management

### Step 3: Set Up Tailwind CSS

The project already includes Tailwind CSS configuration. Verify these files exist:

- `tailwind.config.js` ✓
- `postcss.config.js` ✓
- `app/globals.css` ✓

If everything is in place, Tailwind is ready to use!

### Step 4: Set Up Supabase

#### 4.1 Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in:
   - **Name**: anime-hub (or any name)
   - **Database Password**: (save this securely)
   - **Region**: Choose closest to you
5. Wait 2-3 minutes for project creation

#### 4.2 Set Up Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy the entire contents of `supabase/schema.sql`
4. Paste into the SQL Editor
5. Click **Run** (or press Ctrl+Enter)
6. You should see "Success. No rows returned"

This creates:
- `posters` table (for products)
- `orders` table (for order history)
- Sample poster data for testing

#### 4.3 Get API Keys

1. In Supabase dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key (long JWT token)

#### 4.4 Configure Environment Variables

1. Create a `.env.local` file in the project root:

```bash
# Windows (PowerShell)
New-Item .env.local

# Mac/Linux
touch .env.local
```

2. Add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

**Example:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYzODk2NzI4MCwiZXhwIjoxOTU0NTQzMjgwfQ.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

⚠️ **Important**: Never commit `.env.local` to Git! It's already in `.gitignore`.

### Step 5: Test Locally

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

You should see:
- ✅ Home page with hero section
- ✅ Featured posters (from sample data)
- ✅ Navigation bar
- ✅ Footer

**Test the features:**
1. Click "Shop" to see all posters
2. Filter by category (Naruto, One Piece, etc.)
3. Click a poster to see details
4. Try adding items to cart
5. Create an account (Sign Up)
6. Log in and check your profile

## 🚢 Deployment to Vercel

### Step 1: Push to GitHub (Optional but Recommended)

1. Create a new repository on GitHub
2. Initialize git and push:

```bash
git init
git add .
git commit -m "Initial commit: Anime Hub project"
git branch -M main
git remote add origin https://github.com/yourusername/anime-hub.git
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up/login with GitHub
3. Click **"Add New Project"**
4. Import your GitHub repository (or deploy from local)
5. **Configure Environment Variables**:
   - Click "Environment Variables"
   - Add:
     - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase URL
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key
6. Click **"Deploy"**

Vercel will:
- Install dependencies
- Build your Next.js app
- Deploy to a live URL

### Step 3: Update Supabase Redirect URLs

After deployment, update Supabase auth settings:

1. Go to Supabase Dashboard → **Authentication** → **URL Configuration**
2. Add your Vercel URL to **Redirect URLs**:
   - `https://your-project.vercel.app/**`
   - `https://your-project.vercel.app/auth/callback`

## 📁 Project Structure

```
anime-hub/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   ├── cart/              # Shopping cart page
│   ├── poster/            # Product detail pages
│   ├── profile/           # User profile page
│   ├── shop/              # Shop listing page
│   ├── layout.js          # Root layout
│   ├── page.js            # Home page
│   └── globals.css        # Global styles
├── components/            # Reusable React components
│   ├── AuthForm.js
│   ├── Button.js
│   ├── CartItem.js
│   ├── Footer.js
│   ├── Loader.js
│   ├── Modal.js
│   ├── Navbar.js
│   └── PosterCard.js
├── context/               # React Context providers
│   └── CartContext.js
├── lib/                   # Utility functions
│   └── supabase.js       # Supabase client & helpers
├── supabase/             # Database schema
│   ├── schema.sql
│   └── README.md
├── public/               # Static assets
├── .env.example          # Environment variables template
├── next.config.js        # Next.js configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── package.json          # Dependencies
```

## 🐛 Common Issues & Fixes

### Issue: "Missing Supabase environment variables"

**Fix**: Make sure `.env.local` exists and has correct values. Restart dev server after creating/updating `.env.local`.

### Issue: "Cannot connect to Supabase"

**Fix**: 
- Check your Supabase project is active
- Verify API keys are correct
- Check Supabase dashboard for any service issues

### Issue: "Build fails on Vercel"

**Fix**:
- Ensure environment variables are set in Vercel dashboard
- Check build logs for specific errors
- Verify `next.config.js` is correct

### Issue: "Images not loading"

**Fix**:
- Update `next.config.js` with your Supabase project domain
- Use full URLs for images (not relative paths)
- Check Supabase Storage bucket is public

### Issue: "Authentication not working"

**Fix**:
- Verify redirect URLs in Supabase dashboard
- Check email provider is enabled
- Ensure environment variables are set correctly

### Issue: "Cart items disappear on refresh"

**Fix**: This is expected behavior - cart is stored in localStorage. For persistent carts across devices, implement server-side cart storage.

## 🎨 Customization

### Change Colors

Edit `tailwind.config.js`:

```js
colors: {
  anime: {
    primary: '#6366f1',    // Change to your color
    secondary: '#8b5cf6',
    // ...
  }
}
```

### Add More Categories

1. Update `categories` array in `app/shop/page.js`
2. Add posters with new categories in Supabase

### Modify Database Schema

1. Edit `supabase/schema.sql`
2. Run in Supabase SQL Editor
3. Update TypeScript types if using TypeScript

## 📝 Adding Real Images

1. Upload images to Supabase Storage:
   - Go to **Storage** → **posters** bucket
   - Upload your images
   - Copy public URLs

2. Update poster records:
   - Go to **Table Editor** → **posters**
   - Edit each poster's `image_url` field
   - Paste the public URL

## 🔒 Security Notes

- Never commit `.env.local` to Git
- Use Row Level Security (RLS) in Supabase (already configured)
- The `anon` key is safe for client-side use
- For admin operations, use service role key (server-side only)

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)

## 🤝 Contributing

This is a college project template. Feel free to:
- Add more features
- Improve UI/UX
- Add payment integration
- Implement search functionality
- Add reviews/ratings

## 📄 License

This project is created for educational purposes. Feel free to use it for your college projects.

## 🎓 Project Submission Checklist

- [ ] All pages working correctly
- [ ] Authentication functional
- [ ] Cart persists data
- [ ] Responsive on mobile
- [ ] Deployed to Vercel
- [ ] Environment variables configured
- [ ] Database schema set up
- [ ] Sample data added
- [ ] README updated with your details
- [ ] Code commented where necessary

## 💡 Future Enhancements

- Payment gateway integration (Stripe)
- Search functionality
- Product reviews and ratings
- Wishlist feature
- Email notifications
- Admin dashboard
- Order tracking
- Multiple image support
- Product variants (sizes, frames)

---

**Built with ❤️ for anime fans**

For questions or issues, check the documentation or Supabase/Next.js community forums.



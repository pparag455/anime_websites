# Supabase Setup Guide

## Database Setup

1. **Create a Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Sign up or log in
   - Click "New Project"
   - Fill in project details and wait for it to be created

2. **Run the Schema**
   - Go to your Supabase project dashboard
   - Navigate to "SQL Editor"
   - Copy and paste the contents of `schema.sql`
   - Click "Run" to execute the SQL

3. **Set Up Storage (Optional)**
   - Go to "Storage" in your Supabase dashboard
   - Create a new bucket named "posters"
   - Set it to public if you want public access
   - Upload your poster images here
   - Update the `image_url` in your posters table with the public URLs

4. **Get Your API Keys**
   - Go to "Settings" > "API"
   - Copy your "Project URL" (this is your `NEXT_PUBLIC_SUPABASE_URL`)
   - Copy your "anon public" key (this is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`)

5. **Configure Authentication**
   - Go to "Authentication" > "Settings"
   - Enable "Email" provider
   - Configure email templates if needed
   - Set up redirect URLs for production

## Environment Variables

Add these to your `.env.local` file:

```
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## Testing the Setup

1. Try creating a user account through the signup page
2. Check the "Authentication" > "Users" section in Supabase dashboard
3. Try adding items to cart and creating orders
4. Check the "Table Editor" to see your data



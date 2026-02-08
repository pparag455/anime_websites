#!/usr/bin/env node

/**
 * Quick setup script for Anime Hub
 * Run: node setup-env.js
 */

const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('\n🎌 Anime Hub - Environment Setup\n');
console.log('You need your Supabase credentials:');
console.log('1. Go to https://supabase.com/dashboard');
console.log('2. Select your project (or create one)');
console.log('3. Go to Settings → API');
console.log('4. Copy your Project URL and anon public key\n');

rl.question('Enter your Supabase URL: ', (url) => {
  rl.question('Enter your Supabase Anon Key: ', (key) => {
    const envContent = `# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=${url}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${key}
`;

    fs.writeFileSync('.env.local', envContent);
    console.log('\n✅ .env.local file created successfully!');
    console.log('\nNext steps:');
    console.log('1. Run the SQL schema: supabase/schema.sql in Supabase SQL Editor');
    console.log('2. Start dev server: npm run dev');
    console.log('3. Open http://localhost:3000\n');
    
    rl.close();
  });
});



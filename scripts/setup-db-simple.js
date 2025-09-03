#!/usr/bin/env node

// Simple database setup script that doesn't require Supabase CLI
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(color, message) {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkEnvFile() {
  const envPath = path.join(__dirname, '../apps/askrelo/.env.local');
  
  if (!fs.existsSync(envPath)) {
    log('red', '❌ .env.local file not found in apps/askrelo/');
    log('yellow', '📝 Please copy .env.example to .env.local and configure your Supabase credentials');
    process.exit(1);
  }
  
  const envContent = fs.readFileSync(envPath, 'utf8');
  
  // Check for placeholder values
  if (envContent.includes('NEXT_PUBLIC_SUPABASE_URL=...') || 
      envContent.includes('SUPABASE_SERVICE_ROLE_KEY=...')) {
    log('yellow', '⚠️  Please update your .env.local file with actual Supabase credentials');
    log('yellow', '   Replace "..." with your project URL and service role key');
    log('yellow', '   Get these from: https://supabase.com/dashboard/project/[project-id]/settings/api');
    return false;
  }
  
  return true;
}

function showInstructions() {
  log('bold', '🚀 Relo Network Database Setup');
  console.log('');
  
  if (!checkEnvFile()) {
    console.log('');
    log('yellow', '📋 Next Steps:');
    console.log('1. Update apps/askrelo/.env.local with your Supabase credentials');
    console.log('2. Copy the contents of database/schema.sql');
    console.log('3. Paste it into your Supabase SQL Editor');
    console.log('4. Run the SQL to create tables and RLS policies');
    console.log('5. Come back and run: npm run db:seed');
    return;
  }
  
  log('green', '✅ Environment file configured correctly!');
  console.log('');
  
  log('yellow', '📋 Manual Database Setup Steps:');
  console.log('');
  console.log('1. 🗄️  Apply Database Schema:');
  console.log('   • Go to your Supabase Dashboard > SQL Editor');
  console.log('   • Copy the contents of: database/schema.sql');
  console.log('   • Paste and run the SQL');
  console.log('');
  console.log('2. 🌱 Seed Demo Data:');
  console.log('   • Run: npm run db:seed');
  console.log('   • This adds demo users, suppliers, and a sample case');
  console.log('');
  console.log('3. 🎉 Start Exploring:');
  console.log('   • Visit http://localhost:3000');
  console.log('   • Try the /account page to see demo data');
  console.log('   • Check /directory for supplier listings');
  console.log('');
  
  log('green', 'Your Relo Network MVP will be fully functional! 🏠✨');
}

// Run the setup
showInstructions();
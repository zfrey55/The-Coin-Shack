#!/usr/bin/env node
/**
 * Check if all required environment variables are set
 * Usage: node scripts/check-env.js
 */

require('dotenv').config({ path: '.env.local' });

const required = {
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
};

const optional = {
  NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

console.log('\n🔍 Checking environment variables...\n');

let hasErrors = false;

// Check required
console.log('Required variables:');
Object.entries(required).forEach(([key, value]) => {
  if (value) {
    console.log(`  ✅ ${key}`);
  } else {
    console.log(`  ❌ ${key} - MISSING`);
    hasErrors = true;
  }
});

// Check optional
console.log('\nOptional variables (for production):');
Object.entries(optional).forEach(([key, value]) => {
  if (value) {
    console.log(`  ✅ ${key}`);
  } else {
    console.log(`  ⚠️  ${key} - Not set (using mock data)`);
  }
});

if (hasErrors) {
  console.log('\n❌ Some required variables are missing!');
  console.log('Create a .env.local file with the required variables.\n');
  process.exit(1);
} else {
  console.log('\n✅ All required variables are set!\n');
}


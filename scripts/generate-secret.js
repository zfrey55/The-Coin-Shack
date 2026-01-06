#!/usr/bin/env node
/**
 * Generate a secure random secret for NextAuth
 * Usage: node scripts/generate-secret.js
 */

const crypto = require('crypto');
const secret = crypto.randomBytes(32).toString('base64');
console.log('\n✅ Generated NextAuth Secret:');
console.log(secret);
console.log('\nCopy this value to your .env.local or deployment platform.\n');


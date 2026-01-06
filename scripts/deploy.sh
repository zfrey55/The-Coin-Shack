#!/bin/bash
# Deployment script for The Coin Shack

echo "🚀 Starting deployment process..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
  echo "❌ Error: package.json not found. Run this script from the project root."
  exit 1
fi

# Check Node.js version
echo "📦 Checking Node.js version..."
node_version=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$node_version" -lt 18 ]; then
  echo "❌ Error: Node.js 18+ required. Current version: $(node -v)"
  exit 1
fi
echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo "📥 Installing dependencies..."
npm ci || npm install

# Check environment variables
echo "🔍 Checking environment variables..."
node scripts/check-env.js
if [ $? -ne 0 ]; then
  echo "⚠️  Warning: Some environment variables may be missing"
fi

# Run linter
echo "🔍 Running linter..."
npm run lint

# Build project
echo "🏗️  Building project..."
npm run build

if [ $? -eq 0 ]; then
  echo "✅ Build successful!"
  echo ""
  echo "📋 Next steps:"
  echo "1. Review the build output above"
  echo "2. Push to GitHub: git push origin main"
  echo "3. Deploy to Netlify:"
  echo "   - Go to https://app.netlify.com"
  echo "   - Import your repository"
  echo "   - Set environment variables"
  echo "   - Deploy!"
  echo ""
else
  echo "❌ Build failed! Please fix errors above."
  exit 1
fi


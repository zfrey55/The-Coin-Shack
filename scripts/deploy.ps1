# Deployment script for The Coin Shack (PowerShell)
# Usage: .\scripts\deploy.ps1

Write-Host "🚀 Starting deployment process..." -ForegroundColor Cyan

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: package.json not found. Run this script from the project root." -ForegroundColor Red
    exit 1
}

# Check Node.js version
Write-Host "📦 Checking Node.js version..." -ForegroundColor Cyan
$nodeVersion = (node -v) -replace 'v', '' -replace '\.\d+$', ''
if ([int]$nodeVersion -lt 18) {
    Write-Host "❌ Error: Node.js 18+ required. Current version: $(node -v)" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Node.js version: $(node -v)" -ForegroundColor Green

# Install dependencies
Write-Host "📥 Installing dependencies..." -ForegroundColor Cyan
npm ci
if ($LASTEXITCODE -ne 0) {
    npm install
}

# Check environment variables
Write-Host "🔍 Checking environment variables..." -ForegroundColor Cyan
node scripts/check-env.js

# Run linter
Write-Host "🔍 Running linter..." -ForegroundColor Cyan
npm run lint

# Build project
Write-Host "🏗️  Building project..." -ForegroundColor Cyan
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build successful!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📋 Next steps:" -ForegroundColor Yellow
    Write-Host "1. Review the build output above"
    Write-Host "2. Push to GitHub: git push origin main"
    Write-Host "3. Deploy to Netlify:"
    Write-Host "   - Go to https://app.netlify.com"
    Write-Host "   - Import your repository"
    Write-Host "   - Set environment variables"
    Write-Host "   - Deploy!"
    Write-Host ""
} else {
    Write-Host "❌ Build failed! Please fix errors above." -ForegroundColor Red
    exit 1
}


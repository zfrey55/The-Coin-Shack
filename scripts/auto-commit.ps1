# Auto-commit script for The Coin Shack
# Usage: .\scripts\auto-commit.ps1

Write-Host "🔄 Auto-committing changes..." -ForegroundColor Cyan

cd $PSScriptRoot\..

# Check for changes
$status = git status --porcelain
if ($status) {
    Write-Host "📝 Found changes to commit" -ForegroundColor Yellow
    
    # Add all changes
    git add -A
    Write-Host "✅ Staged all changes" -ForegroundColor Green
    
    # Commit with timestamp
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    git commit -m "Auto-commit: $timestamp"
    Write-Host "✅ Committed changes" -ForegroundColor Green
    
    Write-Host ""
    Write-Host "📤 Push to GitHub:" -ForegroundColor Cyan
    Write-Host "   Option 1: Use GitHub Desktop - Click 'Push origin'" -ForegroundColor Yellow
    Write-Host "   Option 2: Run: git push origin main" -ForegroundColor Yellow
    Write-Host ""
} else {
    Write-Host "✅ Working tree is clean - nothing to commit" -ForegroundColor Green
}

# Show current status
Write-Host "📊 Current status:" -ForegroundColor Cyan
git status --short


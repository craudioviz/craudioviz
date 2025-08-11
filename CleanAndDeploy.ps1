Set-Location "$HOME\CRAudioViz\CRAudioVizAI-Frontend"

$appPath = "src\App.tsx"
(Get-Content $appPath) | Where-Object { $_ -notmatch "AuthContext" } | Set-Content $appPath

Write-Host "Running build..." -ForegroundColor Cyan
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed. Check errors above." -ForegroundColor Red
    exit 1
}

git add $appPath
git commit -m "Clean App.tsx and remove unused AuthContext import"
git push

Write-Host "✅ Code pushed to GitHub." -ForegroundColor Green
Start-Process "https://vercel.com/dashboard"
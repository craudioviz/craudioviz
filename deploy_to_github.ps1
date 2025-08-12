# â˜ï¸ GitHub Auto-Push
$repoPath = $PSScriptRoot
Set-Location $repoPath

git add .
git commit -m "ðŸš€ Automated deploy $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
git push origin main

Write-Host "âœ… Pushed to GitHub"

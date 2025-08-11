# audit-paths.ps1
$root = "C:\Users\royhe\CRAudioVizAIAIAI"
$patterns = @("CRAudioVizAIAIAI-Frontend", "CRAudioVizAIAIAIAI-Backend", "CRAudioVizAIAIAI")
$exclude = @("node_modules", ".git", "dist", "build")

Write-Host ""
Write-Host "Scanning for outdated folder references..." -ForegroundColor Cyan

Get-ChildItem -Path $root -Recurse -File | Where-Object {
    $exclude -notcontains $_.Directory.Name
} | ForEach-Object {
    $file = $_.FullName
    $lines = Get-Content $file
    for ($i = 0; $i -lt $lines.Count; $i++) {
        foreach ($pattern in $patterns) {
            if ($lines[$i] -match $pattern) {
                Write-Host "[!] Found '$pattern' in $file (line $($i + 1))" -ForegroundColor Yellow
            }
        }
    }
}

Write-Host ""
Write-Host "[OK] Scan complete." -ForegroundColor Green
# ðŸ“¦ Package CRAUDIOVIZ System
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$zipName = "CRAUDIOVIZ_$timestamp.zip"
$source = $PSScriptRoot
$dest = Join-Path $PSScriptRoot $zipName

Compress-Archive -Path "$source\*" -DestinationPath $dest -Force
Write-Host "âœ… Packaged system: $zipName"

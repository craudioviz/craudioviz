param (
    [string]$BasePath = "C:\Users\royhe\CRAudioViz\backups",
    [string]$RestorePath = "C:\Users\royhe\CRAudioViz\restored",
    [string]$LogPath = "$env:TEMP\restore-log-$((Get-Date).ToString('yyyyMMdd-HHmmss')).txt",
    [switch]$DryRun
)

function Invoke-RestoreAssets {
    [CmdletBinding()]
    param (
        [switch]$DryRun
    )

    $ErrorActionPreference = "Stop"
    $scriptName = $MyInvocation.MyCommand.Name
    $summary = @()

    Write-Host "`n[$scriptName] Starting restore process..." -ForegroundColor Cyan
    Write-Host "BasePath: $BasePath"
    Write-Host "RestorePath: $RestorePath"
    Write-Host "LogPath: $LogPath`n"

    # Validate paths
    if (!(Test-Path $BasePath)) {
        $msg = "ERROR: Backup path not found: $BasePath"
        Write-Error $msg
        Add-Content -Path $LogPath -Value $msg
        return
    }

    if (!(Test-Path $RestorePath)) {
        Write-Warning "Restore path not found. Creating: $RestorePath"
        New-Item -ItemType Directory -Path $RestorePath -Force | Out-Null
    }

    # Enumerate files
    $files = Get-ChildItem -Path $BasePath -Recurse -File
    if ($files.Count -eq 0) {
        $msg = "WARNING: No files found in backup directory."
        Write-Warning $msg
        Add-Content -Path $LogPath -Value $msg
        return
    }

    foreach ($file in $files) {
        $relativePath = $file.FullName.Substring($BasePath.Length).TrimStart('\')
        $targetPath = Join-Path $RestorePath $relativePath
        $targetDir = Split-Path $targetPath -Parent

        if (!(Test-Path $targetDir)) {
            New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
        }

        if ($DryRun) {
            $msg = "[DryRun] Would restore: $relativePath"
            Write-Host $msg -ForegroundColor Yellow
        } else {
            Copy-Item -Path $file.FullName -Destination $targetPath -Force
            $msg = "Restored: $relativePath"
            Write-Host $msg -ForegroundColor Green
        }

        $summary += $msg
        Add-Content -Path $LogPath -Value $msg
        Write-Verbose "Processed: $relativePath"
    }

    # Summary
    Write-Host "`n[$scriptName] Restore Summary:" -ForegroundColor Cyan
    $summary | ForEach-Object { Write-Host $_ }

    Write-Host "`n[$scriptName] Completed. Log saved to:`n$LogPath" -ForegroundColor Cyan
}

# Self-test block
if ($MyInvocation.InvocationName -eq '.') {
    Write-Host "`n[restore.ps1] Script loaded. Run Invoke-RestoreAssets -DryRun [-Verbose] to begin." -ForegroundColor Magenta
}
# ðŸ§ª Plugin Scaffolder with Logging
$pluginDir = Join-Path $PSScriptRoot "plugins"
$logFile = Join-Path $PSScriptRoot "logs\launch.log"
if (-not (Test-Path $pluginDir)) { New-Item -ItemType Directory -Path $pluginDir | Out-Null }

$name = Read-Host "Enter plugin name (without .py)"
$file = Join-Path $pluginDir "$name.py"

if (Test-Path $file) {
    Write-Host "âŒ Plugin already exists: $file"
    exit 1
}

@"
def main():
    print('ðŸ”§ Running $name plugin...')

if __name__ == '__main__':
    main()
"@ | Set-Content $file

$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
Add-Content $logFile "[$timestamp] ðŸ§ª Scaffolded plugin: $name.py"
Write-Host "âœ… Plugin scaffolded: $file"

# 🚀 CRAUDIOVIZ Modular Launcher
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$user = $env:USERNAME
$cwd = $PSScriptRoot
$configPath = Join-Path $cwd "config.json"
$logDir = Join-Path $cwd "logs"
$logFile = Join-Path $logDir "launch.log"
$pluginDir = Join-Path $cwd "plugins"

# Ensure folders exist
foreach ($dir in @($logDir, $pluginDir)) {
    if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir | Out-Null }
}

# Load config
$config = @{}
if (Test-Path $configPath) {
    $config = Get-Content $configPath | ConvertFrom-Json
}

# Detect Python
$pythonPaths = @(
    "C:\Python313\python.exe",
    "$env:LOCALAPPDATA\Programs\Python\Python311\python.exe",
    "$env:ProgramFiles\Python311\python.exe",
    "$env:WinDir\System32\python.exe"
)
$python = $null
foreach ($path in $pythonPaths) {
    if (Test-Path $path) {
        $python = $path
        break
    }
}
if (-not $python) {
    Write-Host "❌ Python not found."
    Add-Content $logFile "[$timestamp] ❌ Python not found by $user"
    exit 1
}

# Discover plugins
$plugins = Get-ChildItem -Path $pluginDir -Filter *.py | Select-Object -ExpandProperty Name
if ($plugins.Count -eq 0) {
    Write-Host "❌ No plugins found."
    Add-Content $logFile "[$timestamp] ❌ No plugins found by $user"
    exit 1
}

# Plugin selector
$defaultPlugin = $config.default_plugin
if ($defaultPlugin -and ($plugins -contains $defaultPlugin)) {
    $plugin = $defaultPlugin
} else {
    Write-Host "`nAvailable plugins:"
    for ($i = 0; $i -lt $plugins.Count; $i++) {
        Write-Host "[$($i+1)] $($plugins[$i])"
    }
    $selection = Read-Host "`nEnter plugin number to launch"
    if ($selection -notmatch '^\d+$' -or $selection -lt 1 -or $selection -gt $plugins.Count) {
        Write-Host "❌ Invalid selection."
        Add-Content $logFile "[$timestamp] ❌ Invalid plugin selection by $user"
        exit 1
    }
    $plugin = $plugins[$selection - 1]
}

# Launch
Write-Host "`n[$timestamp] Launching $plugin as $user..."
Add-Content $logFile "[$timestamp] 🚀 Launching $plugin by $user"
try {
    & $python (Join-Path $pluginDir $plugin)
    Write-Host "✅ $plugin launched successfully."
    Add-Content $logFile "[$timestamp] ✅ $plugin launched successfully"
} catch {
    Write-Host "❌ Error launching $plugin: $_"
    Add-Content $logFile "[$timestamp] ❌ Error launching $plugin: $_"
}
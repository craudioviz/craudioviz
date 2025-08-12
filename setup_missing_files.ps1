# 🚀 CRAUDIOVIZ Auto-Setup Script
$root = "$env:USERPROFILE\CRAudioViz"
Set-Location $root

# Define content for each file
$scaffoldPlugin = @'
# 🧪 Plugin Scaffolder with Logging
$pluginDir = Join-Path $PSScriptRoot "plugins"
$logFile = Join-Path $PSScriptRoot "logs\launch.log"
if (-not (Test-Path $pluginDir)) { New-Item -ItemType Directory -Path $pluginDir | Out-Null }

$name = Read-Host "Enter plugin name (without .py)"
$file = Join-Path $pluginDir "$name.py"

if (Test-Path $file) {
    Write-Host "❌ Plugin already exists: $file"
    exit 1
}

@"
def main():
    print('🔧 Running $name plugin...')

if __name__ == '__main__':
    main()
"@ | Set-Content $file

$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
Add-Content $logFile "[$timestamp] 🧪 Scaffolded plugin: $name.py"
Write-Host "✅ Plugin scaffolded: $file"
'@

$packageScript = @'
# 📦 Package CRAUDIOVIZ System
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$zipName = "CRAUDIOVIZ_$timestamp.zip"
$source = $PSScriptRoot
$dest = Join-Path $PSScriptRoot $zipName

Compress-Archive -Path "$source\*" -DestinationPath $dest -Force
Write-Host "✅ Packaged system: $zipName"
'@

$deployScript = @'
# ☁️ GitHub Auto-Push
$repoPath = $PSScriptRoot
Set-Location $repoPath

git add .
git commit -m "🚀 Automated deploy $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
git push origin main

Write-Host "✅ Pushed to GitHub"
'@

$pluginManager = @'
import os
import subprocess

PLUGIN_DIR = "plugins"

def list_plugins():
    return [f for f in os.listdir(PLUGIN_DIR) if f.endswith(".py")]

def run_plugin(name):
    subprocess.run(["python", os.path.join(PLUGIN_DIR, name)])

def scaffold_plugin(name):
    path = os.path.join(PLUGIN_DIR, f"{name}.py")
    if os.path.exists(path):
        print("❌ Plugin already exists.")
        return
    with open(path, "w") as f:
        f.write(f"""def main():
    print("🔧 Running {name} plugin...")

if __name__ == "__main__":
    main()
""")
    print(f"✅ Plugin scaffolded: {path}")

if __name__ == "__main__":
    print("Available plugins:")
    for i, p in enumerate(list_plugins(), 1):
        print(f"[{i}] {p}")
    choice = input("Enter plugin number or name: ")
    if choice.isdigit():
        plugins = list_plugins()
        idx = int(choice) - 1
        if 0 <= idx < len(plugins):
            run_plugin(plugins[idx])
    else:
        scaffold_plugin(choice)
'@

$configJson = @'
{
  "default_plugin": "dashboard.py"
}
'@

$gitignore = @'
logs/
*.pyc
__pycache__/
.env
'@

# Write files
Set-Content "scaffold_plugin.ps1" $scaffoldPlugin -Encoding UTF8
Set-Content "package_CRAUDIOVIZ.ps1" $packageScript -Encoding UTF8
Set-Content "deploy_to_github.ps1" $deployScript -Encoding UTF8
Set-Content "plugin_manager.py" $pluginManager -Encoding UTF8
Set-Content "config.json" $configJson -Encoding UTF8
Set-Content ".gitignore" $gitignore -Encoding UTF8

Write-Host "`n✅ All missing files created successfully."
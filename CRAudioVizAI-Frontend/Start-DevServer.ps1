# Start-DevServer.ps1
$preferredPort = 5173
$fallbackPort = 5175
$logPath = ".\Logs\dev-server.log"
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

if (-not (Test-Path ".\Logs")) {
    New-Item -ItemType Directory -Path ".\Logs" | Out-Null
}

function Free-Port($port) {
    $connection = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
    if ($connection) {
        $pid = $connection.OwningProcess
        $process = Get-Process -Id $pid -ErrorAction SilentlyContinue
        if ($process) {
            Write-Host "⚠️ Port $port in use by '$($process.ProcessName)' (PID $pid). Killing..." -ForegroundColor Yellow
            Stop-Process -Id $pid -Force
            Start-Sleep -Seconds 2
            $stillExists = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
            return -not $stillExists
        }
    }
    return $true
}

function Start-Vite($port) {
    Write-Host "🚀 Starting Vite dev server on port $port..." -ForegroundColor Cyan
    $env:VITE_PORT = $port
    npm run dev | Tee-Object -FilePath $logPath -Append
}

# Try preferred port
if (Free-Port $preferredPort) {
    Add-Content $logPath "$timestamp - Using preferred port $preferredPort"
    Start-Vite $preferredPort
} else {
    Write-Host "❌ Port $preferredPort still blocked. Switching to fallback port $fallbackPort..." -ForegroundColor Red
    Add-Content $logPath "$timestamp - Fallback to port $fallbackPort"
    Start-Vite $fallbackPort
}

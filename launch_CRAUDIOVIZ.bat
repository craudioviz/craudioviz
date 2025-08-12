@echo off
echo 🚀 Launching CRAUDIOVIZ Dashboard...
cd /d "%~dp0"
echo Using Python at: C:\Python313\python.exe
"C:\Python313\python.exe" dashboard.py
IF %ERRORLEVEL% NEQ 0 (
    echo ❌ Python script failed with error code %ERRORLEVEL%.
) ELSE (
    echo ✅ Dashboard launched successfully.
)
pause
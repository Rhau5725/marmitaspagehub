@echo off
cd /d "%~dp0"
"C:\Program Files\nodejs\node.exe" "%~dp0node_modules\next\dist\bin\next" dev >> "%~dp0.dev-server.log" 2>&1

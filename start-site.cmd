@echo off
cd /d "%~dp0"
set WRANGLER_LOG_PATH=.wrangler\wrangler.log
"C:\Program Files\nodejs\node.exe" "%~dp0node_modules\vinext\dist\cli.js" dev >> "%~dp0.dev-server.log" 2>&1

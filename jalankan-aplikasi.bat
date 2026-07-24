@echo off
setlocal
cd /d "%~dp0"
set "PORT=5177"
set "URL=http://127.0.0.1:%PORT%/"

echo Menjalankan aplikasi Inventaris Laptop PLNE...
echo Folder aplikasi: %cd%
echo.

where python >nul 2>nul
if %errorlevel%==0 (
  start "" "%URL%"
  python -m http.server %PORT% --bind 127.0.0.1
  goto :done
)

where py >nul 2>nul
if %errorlevel%==0 (
  start "" "%URL%"
  py -m http.server %PORT% --bind 127.0.0.1
  goto :done
)

where node >nul 2>nul
if %errorlevel%==0 (
  start "" "%URL%"
  node local-server.js
  goto :done
)

echo Python atau Node.js tidak ditemukan.
echo Aplikasi akan dibuka langsung dari file index.html.
echo Fitur kamera barcode mungkin perlu dijalankan via server lokal.
start "" "%cd%\index.html"
pause

:done
endlocal

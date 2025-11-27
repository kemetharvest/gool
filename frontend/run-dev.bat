@echo off
cd /d "C:\Users\Mohamed Ali\Desktop\yallagoal22\frontend"
set PATH=C:\Program Files\nodejs;%PATH%
cls
echo Installing dependencies...
echo PATH=%PATH%
npm install
if %errorlevel% neq 0 (
    echo Installation failed!
    pause
    exit /b %errorlevel%
)
echo.
echo Starting development server at http://localhost:5173...
echo.
npm run dev
pause

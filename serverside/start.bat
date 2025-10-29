@echo off
REM Samadhanam Project - Quick Start Script (Windows)
REM This script helps you start all services at once

echo ╔══════════════════════════════════════════════════════════╗
echo ║     Samadhanam - Civic Issue Management System          ║
echo ║              Quick Start Launcher                        ║
echo ╚══════════════════════════════════════════════════════════╝
echo.

REM Check for Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

echo ✅ Node.js and npm are installed
echo.

echo Checking and installing dependencies...
echo.

REM Install dependencies if needed
if not exist "CIVIC-ISSUE-MANAGEMENT\Municipal\backend\node_modules" (
    echo 📦 Installing dependencies for Municipal Backend...
    cd CIVIC-ISSUE-MANAGEMENT\Municipal\backend
    call npm install
    cd ..\..\..
) else (
    echo ✅ Dependencies already installed for Municipal Backend
)

if not exist "CIVIC-ISSUE-MANAGEMENT\State\backend\node_modules" (
    echo 📦 Installing dependencies for State Backend...
    cd CIVIC-ISSUE-MANAGEMENT\State\backend
    call npm install
    cd ..\..\..
) else (
    echo ✅ Dependencies already installed for State Backend
)

if not exist "CIVIC-ISSUE-MANAGEMENT\Municipal\frontend\municipal-frontend\node_modules" (
    echo 📦 Installing dependencies for Municipal Frontend...
    cd CIVIC-ISSUE-MANAGEMENT\Municipal\frontend\municipal-frontend
    call npm install
    cd ..\..\..\..
) else (
    echo ✅ Dependencies already installed for Municipal Frontend
)

if not exist "CIVIC-ISSUE-MANAGEMENT\State\frontend\State-frontend\node_modules" (
    echo 📦 Installing dependencies for State Frontend...
    cd CIVIC-ISSUE-MANAGEMENT\State\frontend\State-frontend
    call npm install
    cd ..\..\..\..
) else (
    echo ✅ Dependencies already installed for State Frontend
)

echo.
echo ═══════════════════════════════════════════════════════════
echo.
echo Starting all services...
echo.
echo Please open 4 terminal windows and run the following commands:
echo.
echo ═══════════════════════════════════════════════════════════
echo Terminal 1 - Municipal Backend
echo cd CIVIC-ISSUE-MANAGEMENT\Municipal\backend
echo npm start
echo.
echo Expected: Server running on http://localhost:4040
echo ═══════════════════════════════════════════════════════════
echo.
echo Terminal 2 - State Backend
echo cd CIVIC-ISSUE-MANAGEMENT\State\backend
echo npm start
echo.
echo Expected: Server running on http://localhost:4005
echo ═══════════════════════════════════════════════════════════
echo.
echo Terminal 3 - Municipal Frontend
echo cd CIVIC-ISSUE-MANAGEMENT\Municipal\frontend\municipal-frontend
echo npm run dev
echo.
echo Expected: Frontend running on http://localhost:5173
echo ═══════════════════════════════════════════════════════════
echo.
echo Terminal 4 - State Frontend
echo cd CIVIC-ISSUE-MANAGEMENT\State\frontend\State-frontend
echo npm run dev
echo.
echo Expected: Frontend running on http://localhost:5174
echo ═══════════════════════════════════════════════════════════
echo.
echo 📝 Quick Links:
echo    Municipal Admin: http://localhost:5173
echo    State Admin: http://localhost:5174
echo    Municipal API: http://localhost:4040
echo    State API: http://localhost:4005
echo.
echo 📚 Documentation:
echo    Implementation Guide: IMPLEMENTATION_GUIDE.md
echo    Summary: IMPLEMENTATION_SUMMARY.md
echo    Quick Reference: QUICK_REFERENCE.md
echo.
echo ✨ All services ready to start!
echo.
pause

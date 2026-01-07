@echo off
echo Starting WatchesTime Full-Stack Application...
echo.

echo Starting Backend Server...
start "WatchesTime Backend" cmd /k "cd backend && npm start"

echo Waiting for backend to start...
timeout /t 5 /nobreak > nul

echo Starting Frontend...
start "WatchesTime Frontend" cmd /k "cd frontend && npm start"

echo.
echo ✅ Both Backend and Frontend are starting!
echo 🔧 Backend: http://localhost:5001
echo 🌐 Frontend: http://localhost:3000
echo.
echo Press any key to close this window...
pause > nul
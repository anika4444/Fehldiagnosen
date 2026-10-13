@echo off
rem Startet run-tests.ps1, auch wenn die PowerShell-Ausfuehrungsrichtlinie Skripte blockiert.
rem Parameter werden durchgereicht, z.B.: run-tests.cmd -SkipIntegration
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0run-tests.ps1" %*
exit /b %ERRORLEVEL%

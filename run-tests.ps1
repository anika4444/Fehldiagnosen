# Führt alle Tests lokal aus (Backend, AI-Service, Frontend).
# Bricht mit Exit-Code 1 ab, sobald ein Teil fehlschlägt.
#
#   .\run-tests.ps1                 # alles
#   .\run-tests.ps1 -SkipIntegration  # ohne Backend-Integrationstests (kein Docker nötig)

param(
    [switch]$SkipIntegration
)

$ErrorActionPreference = "Stop"
$root = $PSScriptRoot
$failed = @()

function Invoke-Step([string]$name, [string]$dir, [scriptblock]$cmd) {
    Write-Host "`n=== $name ===" -ForegroundColor Cyan
    Push-Location $dir
    try {
        & $cmd
        if ($LASTEXITCODE -ne 0) { $script:failed += $name }
    }
    finally {
        Pop-Location
    }
}

Invoke-Step "Backend" "$root\Backend" {
    if ($SkipIntegration) {
        dotnet test Backend.slnx --filter "Category!=Integration"
    }
    else {
        # Integrationstests starten MySQL per Testcontainers -> Docker Desktop muss laufen
        dotnet test Backend.slnx
    }
}

Invoke-Step "AI-Service" "$root\AI" { npm test }

Invoke-Step "Frontend" "$root\frontend" { npm test -- --ci }

if ($failed.Count -gt 0) {
    Write-Host "`nFehlgeschlagen: $($failed -join ', ')" -ForegroundColor Red
    exit 1
}

Write-Host "`nAlle Tests erfolgreich." -ForegroundColor Green

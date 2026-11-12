$ErrorActionPreference = "Continue"
$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot
$pidFile = Join-Path $projectRoot ".local-run\app.pid"

if (Test-Path $pidFile) {
  $appPid = 0
  [void][int]::TryParse((Get-Content $pidFile -Raw), [ref]$appPid)
  if ($appPid -gt 0 -and (Get-Process -Id $appPid -ErrorAction SilentlyContinue)) {
    & taskkill.exe /PID $appPid /T /F *> $null
    if ($LASTEXITCODE -ne 0) { Write-Host "تعذر إيقاف عملية الموقع؛ أغلق نافذتها أو أعد المحاولة." -ForegroundColor Yellow }
  }
  Remove-Item -LiteralPath $pidFile -Force -ErrorAction SilentlyContinue
} else {
  Write-Host "لا توجد عملية موقع مسجلة للتشغيل المحلي."
}

if (Get-Command docker -ErrorAction SilentlyContinue) {
  & docker compose stop db
  if ($LASTEXITCODE -eq 0) {
    Write-Host "تم إيقاف الموقع وقاعدة البيانات. بيانات التطوير محفوظة." -ForegroundColor Green
  } else {
    Write-Host "أوقف الموقع. قاعدة البيانات لم تكن تعمل؛ لم تُحذف أي بيانات." -ForegroundColor Yellow
  }
} else {
  Write-Host "أوقف الموقع. لم أجد Docker لإيقاف قاعدة البيانات." -ForegroundColor Yellow
}

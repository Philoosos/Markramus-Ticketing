[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new($false)
$ErrorActionPreference = "Stop"
$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

function Stop-WithMessage([string]$message) {
  Write-Host "`nتعذر تشغيل موقع مارمرقس: $message" -ForegroundColor Red
  exit 1
}

$node = Get-Command node -ErrorAction SilentlyContinue
if (-not $node) { Stop-WithMessage "ثبّت Node.js إصدار 20.19 أو أحدث، ثم أعد المحاولة." }
$nodeVersionText = (& node --version).TrimStart('v')
try { $nodeVersion = [version]$nodeVersionText } catch { Stop-WithMessage "تعذر قراءة إصدار Node.js." }
if ($nodeVersion -lt [version]"20.19") { Stop-WithMessage "إصدار Node.js الحالي $nodeVersionText؛ المطلوب 20.19 أو أحدث." }

$docker = Get-Command docker -ErrorAction SilentlyContinue
if (-not $docker) { Stop-WithMessage "قاعدة بيانات المشروع تحتاج Docker Desktop. خدمة PostgreSQL التابعة لبرنامج آخر لن تُستخدم." }
try { & docker info *> $null } catch { Stop-WithMessage "شغّل Docker Desktop ثم أعد المحاولة." }
if ($LASTEXITCODE -ne 0) { Stop-WithMessage "شغّل Docker Desktop ثم أعد المحاولة." }

if (-not (Test-Path ".env")) { Copy-Item -LiteralPath ".env.example" -Destination ".env" }
$secretLine = Select-String -Path ".env" -Pattern '^AUTH_HASH_SECRET=' -ErrorAction SilentlyContinue
if (-not $secretLine -or $secretLine.Line -match 'replace-this') {
  $authSecret = (& node -e "process.stdout.write(require('node:crypto').randomBytes(48).toString('base64url'))").Trim()
  if ($secretLine) {
    $envText = Get-Content -Raw ".env"
    $envText = [regex]::Replace($envText, '(?m)^AUTH_HASH_SECRET=.*$', "AUTH_HASH_SECRET=`"$authSecret`"")
    [System.IO.File]::WriteAllText((Join-Path $projectRoot ".env"), $envText, [System.Text.UTF8Encoding]::new($false))
  } else {
    Add-Content -Path ".env" -Value "`nAUTH_HASH_SECRET=`"$authSecret`""
  }
}

$dbLine = (Select-String -Path ".env" -Pattern '^DATABASE_URL=' -ErrorAction SilentlyContinue | Select-Object -First 1).Line
if (-not $dbLine -or $dbLine -notmatch '^DATABASE_URL=.*@(localhost|127\.0\.0\.1):5433/markramus_ticketing(?:\?|$)') { Stop-WithMessage "DATABASE_URL في .env يجب أن يشير إلى localhost:5433/markramus_ticketing؛ لم تُشغّل أو تُعدّل قاعدة أخرى." }
if ($env:DATABASE_URL -and $env:DATABASE_URL -notmatch '^(postgres|postgresql)://[^@]+@(localhost|127\.0\.0\.1):5433/markramus_ticketing(?:\?|$)') { Stop-WithMessage "متغير DATABASE_URL في Windows يشير إلى قاعدة غير محلية؛ أزله أو استخدم قاعدة المشروع صراحة قبل المتابعة." }
Write-Host "تشغيل PostgreSQL خاص بالمشروع على المنفذ 5433..."
& docker compose up -d db
if ($LASTEXITCODE -ne 0) { Stop-WithMessage "تعذر تشغيل قاعدة بيانات المشروع. تحقق من Docker Desktop." }

Write-Host "التحقق من جاهزية قاعدة بيانات المشروع قبل أي ترحيل..."
$databaseReady = $false
for ($i = 0; $i -lt 40; $i++) {
  & docker compose exec -T db pg_isready -U postgres -d markramus_ticketing *> $null
  if ($LASTEXITCODE -eq 0) { $databaseReady = $true; break }
  Start-Sleep -Seconds 2
}
if (-not $databaseReady) { Stop-WithMessage "قاعدة بيانات المشروع لم تصبح جاهزة؛ لم تُطبق أي ترحيلات." }

$next = Join-Path $projectRoot "node_modules\.bin\next.cmd"
if (-not (Test-Path $next)) {
  $npm = Get-Command npm -ErrorAction SilentlyContinue
  if (-not $npm) { Stop-WithMessage "اعتماديات الموقع غير موجودة وnpm غير متاح. ثبّت Node.js مع npm ثم شغّل npm ci داخل مجلد المشروع." }
  Write-Host "تثبيت الاعتماديات من package-lock.json..."
  & npm ci
  if ($LASTEXITCODE -ne 0) { Stop-WithMessage "فشل تثبيت الاعتماديات. راجع سجل npm." }
}

Write-Host "توليد Prisma Client من المخطط الحالي..."
$npm = Get-Command npm -ErrorAction SilentlyContinue
if ($npm) { & npm run db:generate } else { & (Join-Path $projectRoot "node_modules\.bin\prisma.cmd") generate }
if ($LASTEXITCODE -ne 0) { Stop-WithMessage "تعذر توليد Prisma Client." }


Write-Host "قاعدة بيانات المشروع جاهزة. تطبيق ملفات الترحيل الموجودة..."
if ($npm) { & npm run db:deploy } else { & (Join-Path $projectRoot "node_modules\.bin\prisma.cmd") migrate deploy }
if ($LASTEXITCODE -ne 0) { Stop-WithMessage "تعذر تطبيق الترحيلات على قاعدة بيانات المشروع. راجع سجل التشغيل." }

try {
  $existing = Invoke-WebRequest -Uri "http://localhost:3000" -TimeoutSec 2 -UseBasicParsing
  if ($existing.StatusCode -lt 500) {
    Write-Host "الموقع يعمل بالفعل على http://localhost:3000"
    Start-Process "http://localhost:3000"
    exit 0
  }
} catch { }

$stateDir = Join-Path $projectRoot ".local-run"
New-Item -ItemType Directory -Path $stateDir -Force | Out-Null
$pidFile = Join-Path $stateDir "app.pid"
$logFile = Join-Path $stateDir "app.log"
$command = '"' + $next + '" dev > "' + $logFile + '" 2>&1'
$arguments = '/d /s /c "' + $command + '"'
$appProcess = Start-Process -FilePath $env:ComSpec -ArgumentList $arguments -WorkingDirectory $projectRoot -WindowStyle Hidden -PassThru
Set-Content -LiteralPath $pidFile -Value $appProcess.Id -NoNewline

Write-Host "انتظار استجابة الموقع..."
$siteReady = $false
for ($i = 0; $i -lt 40; $i++) {
  try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000" -TimeoutSec 2 -UseBasicParsing
    if ($response.StatusCode -lt 500) { $siteReady = $true; break }
  } catch { }
  Start-Sleep -Seconds 2
}
if (-not $siteReady) {
  Write-Host "لم يستجب الموقع. سجل التشغيل: $logFile" -ForegroundColor Red
  if (Test-Path $logFile) { Get-Content $logFile -Tail 25 }
  Stop-WithMessage "راجع الرسالة أعلاه ثم أعد المحاولة. لم تُحذف أي بيانات."
}

Write-Host "الموقع وقاعدة بيانات المشروع جاهزان: http://localhost:3000" -ForegroundColor Green
Start-Process "http://localhost:3000"


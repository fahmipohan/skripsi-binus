$ErrorActionPreference = "Stop"

$serviceName = "postgresql-x64-18"
$dataDir = "C:\Program Files\PostgreSQL\18\data"
$psql = "C:\Program Files\PostgreSQL\18\bin\psql.exe"
$pgHba = Join-Path $dataDir "pg_hba.conf"
$backup = Join-Path $dataDir ("pg_hba.conf.backup-" + (Get-Date -Format "yyyyMMdd-HHmmss"))
$newPassword = "postgres123"

$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole(
  [Security.Principal.WindowsBuiltInRole]::Administrator
)

if (-not $isAdmin) {
  throw "Script ini harus dijalankan dari PowerShell yang dibuka dengan Run as administrator."
}

if (-not (Test-Path -LiteralPath $pgHba)) {
  throw "File pg_hba.conf tidak ditemukan: $pgHba"
}

if (-not (Test-Path -LiteralPath $psql)) {
  throw "psql.exe tidak ditemukan: $psql"
}

Copy-Item -LiteralPath $pgHba -Destination $backup
Write-Host "Backup dibuat: $backup"

$content = Get-Content -LiteralPath $pgHba
$content = $content -replace '^(host\s+all\s+all\s+127\.0\.0\.1/32\s+)\S+', '${1}trust'
$content = $content -replace '^(host\s+all\s+all\s+::1/128\s+)\S+', '${1}trust'
Set-Content -LiteralPath $pgHba -Value $content -Encoding ASCII

Write-Host "Mode login lokal sementara diubah ke trust."
Restart-Service $serviceName
Start-Sleep -Seconds 2

& $psql -h 127.0.0.1 -p 5432 -U postgres -d postgres -c "ALTER USER postgres WITH PASSWORD '$newPassword';"
Write-Host "Password user postgres berhasil diubah menjadi: $newPassword"

Copy-Item -LiteralPath $backup -Destination $pgHba -Force
Write-Host "Konfigurasi pg_hba.conf dikembalikan dari backup."
Restart-Service $serviceName
Start-Sleep -Seconds 2

$env:PGPASSWORD = $newPassword
& $psql -h 127.0.0.1 -p 5432 -U postgres -d postgres -c "SELECT current_user AS user_login_berhasil;"

Write-Host ""
Write-Host "Selesai. Gunakan kredensial berikut di DBeaver:"
Write-Host "Host     : 127.0.0.1"
Write-Host "Port     : 5432"
Write-Host "Database : postgres"
Write-Host "Username : postgres"
Write-Host "Password : $newPassword"

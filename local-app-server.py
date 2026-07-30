import json
import os
import shutil
import subprocess
import tempfile
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


ROOT = Path(__file__).resolve().parent


def load_env():
    env = {}
    env_file = ROOT / ".env"
    if not env_file.exists():
        env_file = ROOT / ".env.example"
    if env_file.exists():
        for line in env_file.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, value = line.split("=", 1)
            env[key.strip()] = value.strip().strip('"').strip("'")
    return env


APP_ENV = load_env()
APP_PORT = int(APP_ENV.get("APP_PORT", "5177"))


def psql_path():
    configured = APP_ENV.get("PSQL_PATH")
    if configured and Path(configured).exists():
        return configured
    found = shutil.which("psql")
    if found:
        return found
    default = Path(r"C:\Program Files\PostgreSQL\18\bin\psql.exe")
    if default.exists():
        return str(default)
    return "psql"


def sql_text(value):
    if value is None:
        return "NULL"
    text = str(value).strip()
    if text == "":
        return "NULL"
    return "'" + text.replace("'", "''") + "'"


def sql_bool(value):
    return "TRUE" if bool(value) else "FALSE"


def run_sql(sql):
    env = os.environ.copy()
    env["PGPASSWORD"] = APP_ENV.get("DB_PASSWORD", "")
    fd, name = tempfile.mkstemp(prefix="inventaris-", suffix=".sql")
    try:
        with os.fdopen(fd, "w", encoding="utf-8") as handle:
            handle.write(sql)
        cmd = [
            psql_path(),
            "-h",
            APP_ENV.get("DB_HOST", "127.0.0.1"),
            "-p",
            APP_ENV.get("DB_PORT", "5432"),
            "-U",
            APP_ENV.get("DB_USER", "postgres"),
            "-d",
            APP_ENV.get("DB_NAME", "inventaris_laptop_plne"),
            "-v",
            "ON_ERROR_STOP=1",
            "-f",
            name,
        ]
        return subprocess.run(cmd, capture_output=True, text=True, env=env)
    finally:
        try:
            os.remove(name)
        except OSError:
            pass


def build_device_sql(device):
    serial = str(device.get("serialNumber", "")).strip().upper()
    if not serial:
        raise ValueError("Serial number wajib diisi.")

    division = str(device.get("division", "")).strip()
    nip = str(device.get("nip", "")).strip()
    user_name = str(device.get("userName", "")).strip()
    has_user = bool(nip or user_name or device.get("email") or device.get("phone") or division)

    statements = [
        "BEGIN;",
        f"""
INSERT INTO devices (
  serial_number, ownership, received_date, device_type, brand_series,
  processor, ram, storage, vga, device_condition, charge_code,
  computer_name, computer_status, ip_address, mac_address_1, mac_address_2,
  ba_receive, ba_return, current_status, notes, updated_at
) VALUES (
  {sql_text(serial)}, {sql_text(device.get("ownership"))}, {sql_text(device.get("receivedDate"))},
  {sql_text(device.get("deviceType") or "Laptop Basic")}, {sql_text(device.get("brandSeries"))},
  {sql_text(device.get("processor"))}, {sql_text(device.get("ram"))}, {sql_text(device.get("storage"))},
  {sql_text(device.get("vga"))}, {sql_text(device.get("condition") or "Normal")},
  {sql_text(device.get("chargeCode"))}, {sql_text(device.get("computerName"))},
  {sql_text(device.get("computerStatus") or "Pending")}, {sql_text(device.get("ipAddress"))},
  {sql_text(device.get("macAddress1"))}, {sql_text(device.get("macAddress2"))},
  {sql_text(device.get("baReceive"))}, {sql_text(device.get("baReturn"))},
  {sql_text(device.get("currentStatus") or "Staging IT")}, {sql_text(device.get("notes"))},
  CURRENT_TIMESTAMP
)
ON CONFLICT (serial_number) DO UPDATE SET
  ownership = EXCLUDED.ownership,
  received_date = EXCLUDED.received_date,
  device_type = EXCLUDED.device_type,
  brand_series = EXCLUDED.brand_series,
  processor = EXCLUDED.processor,
  ram = EXCLUDED.ram,
  storage = EXCLUDED.storage,
  vga = EXCLUDED.vga,
  device_condition = EXCLUDED.device_condition,
  charge_code = EXCLUDED.charge_code,
  computer_name = EXCLUDED.computer_name,
  computer_status = EXCLUDED.computer_status,
  ip_address = EXCLUDED.ip_address,
  mac_address_1 = EXCLUDED.mac_address_1,
  mac_address_2 = EXCLUDED.mac_address_2,
  ba_receive = EXCLUDED.ba_receive,
  ba_return = EXCLUDED.ba_return,
  current_status = EXCLUDED.current_status,
  notes = EXCLUDED.notes,
  updated_at = CURRENT_TIMESTAMP;
""",
        f"""
INSERT INTO device_security_checks (
  device_id, renamed, anti_virus, screen_saver, dlp, uem, edr,
  patch_windows, ms365, checked_by, checked_at, updated_at
)
SELECT
  id, {sql_bool(device.get("renamed"))}, {sql_bool(device.get("antiVirus"))},
  {sql_bool(device.get("screenSaver"))}, {sql_bool(device.get("dlp"))},
  {sql_bool(device.get("uem"))}, {sql_bool(device.get("edr"))},
  {sql_bool(device.get("patchWindows"))}, {sql_bool(device.get("ms365"))},
  'IT',
  CASE
    WHEN {sql_bool(any(device.get(field) for field in ["renamed", "antiVirus", "screenSaver", "dlp", "uem", "edr", "patchWindows", "ms365"]))}
    THEN CURRENT_TIMESTAMP
    ELSE NULL
  END,
  CURRENT_TIMESTAMP
FROM devices
WHERE serial_number = {sql_text(serial)}
ON CONFLICT (device_id) DO UPDATE SET
  renamed = EXCLUDED.renamed,
  anti_virus = EXCLUDED.anti_virus,
  screen_saver = EXCLUDED.screen_saver,
  dlp = EXCLUDED.dlp,
  uem = EXCLUDED.uem,
  edr = EXCLUDED.edr,
  patch_windows = EXCLUDED.patch_windows,
  ms365 = EXCLUDED.ms365,
  checked_by = EXCLUDED.checked_by,
  checked_at = EXCLUDED.checked_at,
  updated_at = CURRENT_TIMESTAMP;
""",
    ]

    if division:
        statements.append(f"INSERT INTO divisions (name) VALUES ({sql_text(division)}) ON CONFLICT (name) DO NOTHING;")

    if has_user:
        effective_nip = nip or f"NO-NIP-{serial}"
        effective_name = user_name or "Belum dialokasi"
        statements.append(
            f"""
INSERT INTO users (nip, full_name, email, phone, division_id, updated_at)
VALUES (
  {sql_text(effective_nip)}, {sql_text(effective_name)}, {sql_text(device.get("email"))},
  {sql_text(device.get("phone"))},
  (SELECT id FROM divisions WHERE name = {sql_text(division)}),
  CURRENT_TIMESTAMP
)
ON CONFLICT (nip) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  email = EXCLUDED.email,
  phone = EXCLUDED.phone,
  division_id = EXCLUDED.division_id,
  updated_at = CURRENT_TIMESTAMP;
"""
        )
        statements.append(
            f"""
DELETE FROM device_assignments
WHERE device_id = (SELECT id FROM devices WHERE serial_number = {sql_text(serial)})
  AND assignment_status = 'Aktif';

INSERT INTO device_assignments (
  device_id, user_id, assigned_date, ba_receive, ba_return, assignment_status, notes, updated_at
)
SELECT
  d.id, u.id,
  CASE WHEN {sql_text(device.get("currentStatus"))} = 'Terdistribusi' THEN CURRENT_DATE ELSE NULL END,
  {sql_text(device.get("baReceive"))}, {sql_text(device.get("baReturn"))},
  'Aktif',
  {sql_text("Distribusi diperbarui dari aplikasi inventaris.")},
  CURRENT_TIMESTAMP
FROM devices d
JOIN users u ON u.nip = {sql_text(effective_nip)}
WHERE d.serial_number = {sql_text(serial)};
"""
        )

    statements.append(
        f"""
INSERT INTO activity_logs (device_id, actor_name, activity_type, description)
SELECT id, 'IT', 'UPSERT_DEVICE', {sql_text("Data perangkat disimpan dari aplikasi web lokal.")}
FROM devices
WHERE serial_number = {sql_text(serial)};
COMMIT;
"""
    )
    return "\n".join(statements)


class AppHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def send_json(self, status, payload):
        data = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def do_GET(self):
        if self.path == "/api/health":
            self.send_json(200, {"ok": True, "database": APP_ENV.get("DB_NAME", "inventaris_laptop_plne")})
            return
        return super().do_GET()

    def do_POST(self):
        if self.path != "/api/devices":
            self.send_json(404, {"ok": False, "error": "Endpoint tidak ditemukan."})
            return
        try:
            length = int(self.headers.get("Content-Length", "0"))
            payload = json.loads(self.rfile.read(length).decode("utf-8"))
            sql = build_device_sql(payload)
            proc = run_sql(sql)
            if proc.returncode != 0:
                self.send_json(500, {"ok": False, "error": proc.stderr.strip() or "Gagal menyimpan ke database."})
                return
            self.send_json(200, {"ok": True, "message": "Data berhasil disimpan ke PostgreSQL."})
        except Exception as exc:
            self.send_json(500, {"ok": False, "error": str(exc)})


if __name__ == "__main__":
    server = ThreadingHTTPServer(("127.0.0.1", APP_PORT), AppHandler)
    print(f"Aplikasi berjalan di http://127.0.0.1:{APP_PORT}/")
    print(f"Database target: {APP_ENV.get('DB_NAME', 'inventaris_laptop_plne')}")
    print("Tekan Ctrl+C untuk menghentikan server.")
    server.serve_forever()

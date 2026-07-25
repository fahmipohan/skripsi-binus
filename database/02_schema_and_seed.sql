-- Jalankan file ini setelah koneksi DBeaver diarahkan ke database:
-- inventaris_laptop_plne

DROP TABLE IF EXISTS activity_logs;
DROP TABLE IF EXISTS device_security_checks;
DROP TABLE IF EXISTS device_assignments;
DROP TABLE IF EXISTS devices;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS divisions;

CREATE TABLE divisions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150) UNIQUE NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  nip VARCHAR(50) UNIQUE,
  full_name VARCHAR(150) NOT NULL,
  email VARCHAR(150),
  phone VARCHAR(50),
  division_id INT REFERENCES divisions(id) ON DELETE SET NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE devices (
  id SERIAL PRIMARY KEY,
  serial_number VARCHAR(100) UNIQUE NOT NULL,
  ownership VARCHAR(100),
  received_date DATE,
  device_type VARCHAR(100) NOT NULL,
  brand_series VARCHAR(150),
  processor VARCHAR(150),
  ram VARCHAR(50),
  storage VARCHAR(50),
  vga VARCHAR(100),
  device_condition VARCHAR(50) NOT NULL DEFAULT 'Normal',
  charge_code VARCHAR(100),
  computer_name VARCHAR(100),
  computer_status VARCHAR(50) DEFAULT 'Pending',
  ip_address VARCHAR(50),
  mac_address_1 VARCHAR(50),
  mac_address_2 VARCHAR(50),
  ba_receive VARCHAR(100),
  ba_return VARCHAR(100),
  current_status VARCHAR(50) NOT NULL DEFAULT 'Staging IT',
  notes TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT chk_device_condition CHECK (device_condition IN ('Normal', 'Gangguan', 'Rusak')),
  CONSTRAINT chk_current_status CHECK (current_status IN ('Diterima', 'Staging IT', 'Siap Distribusi', 'Terdistribusi', 'Maintenance', 'Nonaktif'))
);

CREATE TABLE device_security_checks (
  id SERIAL PRIMARY KEY,
  device_id INT UNIQUE NOT NULL REFERENCES devices(id) ON DELETE CASCADE,
  renamed BOOLEAN NOT NULL DEFAULT FALSE,
  anti_virus BOOLEAN NOT NULL DEFAULT FALSE,
  screen_saver BOOLEAN NOT NULL DEFAULT FALSE,
  dlp BOOLEAN NOT NULL DEFAULT FALSE,
  uem BOOLEAN NOT NULL DEFAULT FALSE,
  edr BOOLEAN NOT NULL DEFAULT FALSE,
  patch_windows BOOLEAN NOT NULL DEFAULT FALSE,
  ms365 BOOLEAN NOT NULL DEFAULT FALSE,
  checked_by VARCHAR(100),
  checked_at TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE device_assignments (
  id SERIAL PRIMARY KEY,
  device_id INT NOT NULL REFERENCES devices(id) ON DELETE CASCADE,
  user_id INT REFERENCES users(id) ON DELETE SET NULL,
  assigned_date DATE,
  returned_date DATE,
  ba_receive VARCHAR(100),
  ba_return VARCHAR(100),
  assignment_status VARCHAR(50) NOT NULL DEFAULT 'Aktif',
  notes TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT chk_assignment_status CHECK (assignment_status IN ('Aktif', 'Dikembalikan', 'Batal'))
);

CREATE TABLE activity_logs (
  id SERIAL PRIMARY KEY,
  device_id INT REFERENCES devices(id) ON DELETE CASCADE,
  actor_name VARCHAR(100),
  activity_type VARCHAR(100) NOT NULL,
  description TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_devices_serial_number ON devices(serial_number);
CREATE INDEX idx_devices_current_status ON devices(current_status);
CREATE INDEX idx_devices_ownership ON devices(ownership);
CREATE INDEX idx_users_nip ON users(nip);
CREATE INDEX idx_assignments_device_id ON device_assignments(device_id);
CREATE INDEX idx_activity_logs_device_id ON activity_logs(device_id);

INSERT INTO divisions (name) VALUES
  ('Keuangan'),
  ('Power System, Digital, dan Teknologi Informasi'),
  ('Manajemen Kontrak dan Pengadaan'),
  ('Perencanaan Korporat dan Quality Control'),
  ('Sub Bidang MUM');

INSERT INTO users (nip, full_name, email, phone, division_id) VALUES
  ('KRY-001', 'Karyawan Keuangan 01', 'user.keuangan01@example.local', NULL, 1),
  ('KRY-128', 'Karyawan Enjiniring 02', 'user.enjiniring02@example.local', NULL, 2),
  ('KRY-506', 'Karyawan Pengadaan 04', 'user.pengadaan04@example.local', NULL, 3),
  ('KRY-386', 'Karyawan Korporat 03', 'user.korporat03@example.local', NULL, 4);

INSERT INTO devices (
  serial_number, ownership, received_date, device_type, brand_series,
  processor, ram, storage, vga, device_condition, charge_code,
  computer_name, computer_status, ip_address, mac_address_1,
  ba_receive, current_status, notes
) VALUES
  (
    'PF45QP1G', 'Sewa GSP Tahap 1', '2025-06-26', 'Laptop Basic',
    'Lenovo V14 G2 ITL', 'Intel i5-1135G7', '8 GB', '512 GB',
    'GPU MX350', 'Normal', 'KEU.25', 'KEU-2001005O', 'OK',
    'DYNAMIC', 'AC:5A:FC:6D:0B:A5', 'P.1001.26-06-25',
    'Terdistribusi', 'Contoh data anonim dari struktur database perangkat.'
  ),
  (
    'MP2GY2L3', 'Sewa GSP Tahap 2', '2025-07-10', 'Laptop High',
    'Lenovo Legion Slim 5 82YA008LID', 'Core i7-13700H', '16 GB',
    '1 TB', 'RTX 4060 6GB', 'Normal', 'E.9.I1.C1.23.01',
    NULL, 'Pending', NULL, NULL, NULL, 'Staging IT',
    'Menunggu instalasi awal dan rename komputer.'
  ),
  (
    '5CD4037W5L', 'KHS GSP Tahap 1', '2025-07-15', 'Laptop Basic',
    'HP EliteBook 630', 'Intel Core i7-1355U', '16 GB', '1 TB',
    'Intel UHD', 'Normal', 'Z.0.I1.J0.23.07', 'PSD-8718013',
    'OK', 'DYNAMIC', '60:45:2E:F6:EE:33', 'PLNE-LPT1-2025-03',
    'Siap Distribusi', 'MS 365 belum dikonfirmasi.'
  ),
  (
    'CND4490JW5', 'KHS GSP Tahap 2', '2025-08-08', 'Laptop Medium',
    'HP Pavilion 16 inch Laptop 16-af0888TX', 'Intel Core i7',
    '16 GB', '1 TB', 'RTX 2050', 'Gangguan', 'PKPU23',
    NULL, 'Perlu Cek', NULL, NULL, 'P.1006.27-05-25',
    'Maintenance', 'Kondisi gangguan saat pemeriksaan awal.'
  ),
  (
    'MP2BQF9X', 'KHS GSP Tahap 3', '2025-08-08', 'Laptop Medium',
    'Lenovo IdeaPad Slim 5', 'Intel Core i7-1255U', '16 GB',
    '1 TB', 'Nvidia GeForce MX550 2 GB', 'Normal', 'SAR.25',
    'SAR-9619049', 'OK', 'DYNAMIC', '9C:2F:9D:A0:47:01',
    'P.10156.19-08-25', 'Terdistribusi', NULL
  );

INSERT INTO device_security_checks (
  device_id, renamed, anti_virus, screen_saver, dlp, uem, edr,
  patch_windows, ms365, checked_by, checked_at
) VALUES
  (1, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 'IT', CURRENT_TIMESTAMP),
  (2, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, NULL, NULL),
  (3, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, 'IT', CURRENT_TIMESTAMP),
  (4, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, NULL, NULL),
  (5, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 'IT', CURRENT_TIMESTAMP);

INSERT INTO device_assignments (
  device_id, user_id, assigned_date, ba_receive, assignment_status, notes
) VALUES
  (1, 1, '2025-06-26', 'P.1001.26-06-25', 'Aktif', 'Perangkat sudah digunakan user.'),
  (3, 2, NULL, 'PLNE-LPT1-2025-03', 'Aktif', 'Siap distribusi ke user terkait.'),
  (5, 3, '2025-08-19', 'P.10156.19-08-25', 'Aktif', 'Perangkat sudah digunakan user.'),
  (4, 4, NULL, 'P.1006.27-05-25', 'Batal', 'Ditahan karena maintenance.');

INSERT INTO activity_logs (device_id, actor_name, activity_type, description) VALUES
  (1, 'IT', 'INSTALLATION_COMPLETED', 'Checklist keamanan lengkap dan laptop terdistribusi.'),
  (2, 'IT', 'STAGING_STARTED', 'Perangkat masuk staging IT setelah scan barcode.'),
  (3, 'IT', 'SECURITY_CHECK', 'Checklist hampir lengkap, MS 365 belum dikonfirmasi.'),
  (4, 'IT', 'MAINTENANCE', 'Perangkat ditandai gangguan saat pemeriksaan awal.'),
  (5, 'IT', 'INSTALLATION_COMPLETED', 'Checklist keamanan lengkap dan laptop terdistribusi.');

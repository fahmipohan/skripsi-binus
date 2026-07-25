-- Query pengecekan setelah setup database.

-- 1. Lihat semua perangkat beserta user dan bidangnya.
SELECT
  d.serial_number,
  d.ownership,
  d.device_type,
  d.brand_series,
  d.computer_name,
  d.current_status,
  u.nip,
  u.full_name,
  div.name AS division
FROM devices d
LEFT JOIN device_assignments da ON da.device_id = d.id AND da.assignment_status = 'Aktif'
LEFT JOIN users u ON u.id = da.user_id
LEFT JOIN divisions div ON div.id = u.division_id
ORDER BY d.id;

-- 2. Hitung jumlah perangkat per status.
SELECT current_status, COUNT(*) AS total
FROM devices
GROUP BY current_status
ORDER BY current_status;

-- 3. Hitung progress checklist keamanan setiap perangkat.
SELECT
  d.serial_number,
  d.brand_series,
  d.current_status,
  (
    (CASE WHEN sc.renamed THEN 1 ELSE 0 END) +
    (CASE WHEN sc.anti_virus THEN 1 ELSE 0 END) +
    (CASE WHEN sc.screen_saver THEN 1 ELSE 0 END) +
    (CASE WHEN sc.dlp THEN 1 ELSE 0 END) +
    (CASE WHEN sc.uem THEN 1 ELSE 0 END) +
    (CASE WHEN sc.edr THEN 1 ELSE 0 END) +
    (CASE WHEN sc.patch_windows THEN 1 ELSE 0 END) +
    (CASE WHEN sc.ms365 THEN 1 ELSE 0 END)
  ) * 100 / 8 AS security_progress_percent
FROM devices d
LEFT JOIN device_security_checks sc ON sc.device_id = d.id
ORDER BY security_progress_percent ASC, d.serial_number;

-- 4. Cari perangkat berdasarkan serial number hasil scan barcode.
SELECT *
FROM devices
WHERE serial_number = 'PF45QP1G';

-- 5. Contoh insert perangkat baru dari hasil scan barcode.
-- Ubah serial_number sesuai hasil scan.
/*
INSERT INTO devices (
  serial_number, ownership, received_date, device_type,
  device_condition, computer_status, current_status, notes
) VALUES (
  'SCAN-CONTOH-001', 'Batch belum ditentukan', CURRENT_DATE,
  'Laptop Basic', 'Normal', 'Pending', 'Staging IT',
  'Dibuat dari hasil scan barcode.'
);

INSERT INTO device_security_checks (device_id)
VALUES (currval('devices_id_seq'));
*/

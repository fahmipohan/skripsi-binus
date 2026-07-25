# Panduan Setup PostgreSQL di DBeaver

## 1. Install PostgreSQL

Jika PostgreSQL belum ada:

1. Download PostgreSQL dari `https://www.postgresql.org/download/windows/`.
2. Jalankan installer.
3. Saat diminta password user `postgres`, buat password yang mudah kamu ingat.
4. Port biarkan default: `5432`.
5. Selesaikan instalasi.

## 2. Buat koneksi di DBeaver

1. Buka DBeaver.
2. Klik `New Database Connection`.
3. Pilih `PostgreSQL`.
4. Isi koneksi:
   - Host: `localhost`
   - Port: `5432`
   - Database: `postgres`
   - Username: `postgres`
   - Password: password PostgreSQL yang kamu buat saat instalasi
5. Klik `Test Connection`.
6. Jika diminta download driver, klik `Download`.
7. Jika sukses, klik `Finish`.

## 3. Buat database aplikasi

1. Klik kanan koneksi PostgreSQL di DBeaver.
2. Pilih `SQL Editor` lalu `New SQL Script`.
3. Buka file `database/01_create_database.sql`.
4. Copy semua isi file ke SQL Editor.
5. Klik tombol `Execute SQL Statement`.
6. Setelah berhasil, refresh koneksi.

Database baru bernama:

```text
inventaris_laptop_plne
```

## 4. Hubungkan DBeaver ke database baru

Cara mudah:

1. Klik kanan koneksi PostgreSQL.
2. Pilih `Edit Connection`.
3. Ganti `Database` dari `postgres` menjadi `inventaris_laptop_plne`.
4. Klik `Test Connection`.
5. Klik `OK`.

Alternatif lain: buat koneksi PostgreSQL baru dengan database `inventaris_laptop_plne`.

## 5. Buat tabel dan data contoh

1. Pastikan koneksi sudah masuk ke database `inventaris_laptop_plne`.
2. Buka `SQL Editor`.
3. Buka file `database/02_schema_and_seed.sql`.
4. Copy semua isi file ke SQL Editor.
5. Klik `Execute SQL Script`.

Setelah berhasil, tabel yang dibuat adalah:

- `divisions`
- `users`
- `devices`
- `device_security_checks`
- `device_assignments`
- `activity_logs`

## 6. Cek hasil database

1. Buka file `database/03_check_queries.sql`.
2. Jalankan query pertama untuk melihat daftar perangkat.
3. Jalankan query kedua untuk melihat jumlah perangkat per status.
4. Jalankan query ketiga untuk melihat progress checklist keamanan.

## 7. Penjelasan singkat untuk skripsi

DBMS yang digunakan adalah PostgreSQL. DBeaver digunakan sebagai database client untuk membuat, mengelola, dan memeriksa struktur database.

Struktur database dipisah menjadi beberapa tabel agar lebih rapi:

- `devices`: data utama laptop inventaris.
- `device_security_checks`: checklist proses IT seperti antivirus, DLP, UEM, EDR/XDR, patch Windows, dan MS 365.
- `users`: data karyawan penerima perangkat.
- `divisions`: data bidang/divisi.
- `device_assignments`: riwayat penyerahan dan pengembalian perangkat.
- `activity_logs`: catatan aktivitas terhadap perangkat.

Dengan struktur ini, data inventaris tidak lagi tersebar di Excel, tetapi tersimpan terpusat di database PostgreSQL.

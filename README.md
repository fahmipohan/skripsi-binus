# Inventaris Laptop PLNE

Prototype aplikasi web untuk pendataan inventaris laptop PT PLN Enjiniring.

## Fitur

- Dashboard jumlah perangkat, status workflow, dan kesiapan checklist IT.
- CRUD data laptop berdasarkan struktur database dari PDF perangkat.
- Scan barcode via input manual/scanner USB, plus kamera jika browser mendukung `BarcodeDetector`.
- Monitoring pengadaan per batch/kepemilikan.
- Ekspor dan impor data JSON/CSV.
- Penyimpanan sementara menggunakan `localStorage` browser.

## Cara menjalankan

Cara paling mudah di Windows:

```text
Klik dua kali jalankan-aplikasi.bat
```

Atau jalankan dari folder ini dengan server lokal:

```powershell
python -m http.server 5177 --bind 127.0.0.1
```

Lalu buka:

```text
http://127.0.0.1:5177/
```

Untuk mengembalikan data contoh awal setelah uji coba:

```text
http://127.0.0.1:5177/?reset=1
```

## Catatan skripsi

Prototype ini dapat dikembangkan menjadi sistem produksi dengan backend seperti Laravel, Express, atau Django dan database MySQL/PostgreSQL. Struktur data di halaman Laporan dapat dijadikan rancangan awal tabel `devices`, sedangkan checklist IT dapat dipisahkan ke tabel `device_security_checks` jika dibutuhkan normalisasi database.

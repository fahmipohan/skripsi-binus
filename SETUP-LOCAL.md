# Setup Lokal Aplikasi Inventaris Laptop PLNE

## Cara paling mudah di Windows

1. Extract folder aplikasi dari ZIP.
2. Buka folder `inventaris-laptop-plne`.
3. Klik dua kali file `jalankan-aplikasi.bat`.
4. Browser akan membuka `http://127.0.0.1:5177/`.
5. Biarkan jendela Command Prompt tetap terbuka selama aplikasi dipakai.
6. Untuk berhenti, tekan `Ctrl+C` di Command Prompt lalu tutup jendelanya.

## Jika file BAT tidak berjalan

Jalankan manual dari Command Prompt atau PowerShell:

```powershell
cd "LOKASI_FOLDER\inventaris-laptop-plne"
python -m http.server 5177 --bind 127.0.0.1
```

Lalu buka:

```text
http://127.0.0.1:5177/
```

Jika Python tidak ada, install Python dari:

```text
https://www.python.org/downloads/
```

Saat instalasi, centang `Add Python to PATH`.

## Reset data demo

Buka URL ini:

```text
http://127.0.0.1:5177/?reset=1
```

Atau masuk ke menu `Laporan`, lalu klik `Reset Data Demo`.

## Catatan penyimpanan

Prototype ini menyimpan data di `localStorage` browser. Artinya data tersimpan di browser yang sama pada laptop yang sama. Untuk backup, gunakan tombol ekspor `CSV` atau `JSON` di halaman Inventaris.

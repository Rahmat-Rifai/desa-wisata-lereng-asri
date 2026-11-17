# Desa Wisata Lereng Asri - Website Mobile-First

Portal web resmi pusat informasi, transparansi tarif, dan reservasi langsung via WhatsApp untuk **Desa Wisata Lereng Asri**, dikelola oleh BUMDes Sukamaju.

## Karakter & Standar Desain
Proyek ini dibangun dengan standar **Anti-Slop** ([miqdadbadjuber/anti-slop](https://github.com/miqdadbadjuber/anti-slop)) untuk menjamin antarmuka yang autentik, bersih dari elemen AI klise, dan ramah pengguna di perangkat mobile:
- **Zero Em Dash (`—`):** Bebas dari karakter em dash pada seluruh teks UI (R-02).
- **Zero Emoji Dekoratif:** Menggunakan ikon SVG semantik yang relevan dengan aksesibilitas ARIA (R-04).
- **Kejujuran Data & Metrik:** Menampilkan data riil kapasitas parkir, jarak tempuh, dan harga tanpa estimasi fiktif (C-5, R-17).
- **Aksesibilitas Teruji (WCAG 2.1 AA/AAA):** Kontras warna teks utama 17.7:1, tombol tindakan 10.5:1, navigasi keyboard penuh, dan target sentuh minimum 44px (R-03, R-25, R-32).

## Fitur Utama
1. **Bar Ketinggian & Cuaca:** Indikator kondisi alam 1.250 mdpl (19°C), jam buka gerbang, dan nomor kontak posko.
2. **Katalog 5 Objek Wisata:** Lengkap dengan jam operasional, harga tiket masuk resmi, jarak jalan kaki dari parkir, dan filter kategori (*Semua*, *Alam & Foto*, *Edukasi & Kuliner*).
3. **Paket Wisata Terpadu (All-In):** Paket Santai Keluarga, Paket Outbound Instansi, Paket Camping Sejuk, dan Edukasi Petani Cilik.
4. **Kalkulator Biaya Transparan:** Simulasi biaya otomatis sesuai jumlah peserta/tenda dengan tombol kirim langsung ke WhatsApp BUMDes.
5. **Formulir Reservasi Interaktif:** Modal formulir ramah keyboard (Escape to close, focus trap) yang otomatis mengonversi data menjadi draf WhatsApp.
6. **Panduan Jalur Masuk & Parkir Bus:** Panduan rute jalan aspal 7,5 meter ramah bus 50-seat dan area parkir 2 hektar.

## Struktur Berkas
- `index.html` : Struktur semantik HTML5, Plus Jakarta Sans, dan Tailwind CSS.
- `style.css` : Token desain, target sentuh minimum, aturan fokus keyboard, dan stylesheet cetak.
- `app.js` : Logika filter kategori, kalkulator biaya, modal aksesibel, dan generator link WhatsApp.
- `DESIGN.md` : Dokumentasi sistem desain dan token visual.
- `PRD_Desa_Wisata_Lereng_Asri.md` : Product Requirements Document ringkas.
- `handover_spesifikasi_teknis_...md` : Dokumen spesifikasi teknis dan integrasi lengkap.

## Cara Menjalankan Secara Lokal
Buka folder ini dan jalankan server lokal sederhana:
```bash
# Menggunakan Python
python -m http.server 3000

# Atau menggunakan Node.js (npx serve)
npx serve .
```
Akses di browser melalui `http://localhost:3000`.

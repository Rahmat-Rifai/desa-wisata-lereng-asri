# DOKUMEN SPESIFIKASI TEKNIS & HANDOVER IMPLEMENTASI (FRONTEND & INTEGRASI)
## Website Mobile-First Desa Wisata Lereng Asri
**Versi:** 1.0.0 (Final Production Ready - Anti-Slop Edition)  
**Tanggal:** 17 November 2026  
**Penulis / Tim:** Analis Kebutuhan Sistem & UI/UX Designer  
**Target Platform:** Mobile-First Web Application (Responsive Viewport: 390px - 430px, Tailwind CSS v3+)  
**Standar Desain:** `miqdadbadjuber/anti-slop` (`antislop-ui`, `antislop-copywriting`, `antislop-human`)  

---

## DAFTAR ISI
1. [Ringkasan Eksekutif & Karakter Produk](#1-ringkasan-eksekutif--karakter-produk)
2. [Prinsip Desain & Anti-Slop Rules](#2-prinsip-desain--anti-slop-rules)
3. [Design Tokens & Style Guide](#3-design-tokens--style-guide)
4. [Arsitektur Shell & Navigasi Global](#4-arsitektur-shell--navigasi-global)
5. [Spesifikasi Rinci Halaman (Screens Specification)](#5-spesifikasi-rinci-halaman-screens-specification)
   - 5.1 [Beranda (Home)](#51-beranda-home)
   - 5.2 [Katalog Destinasi (Destinations)](#52-katalog-destinasi-destinations)
   - 5.3 [Paket Wisata & Harga (Tour Packages & Pricing)](#53-paket-wisata--harga-tour-packages--pricing)
   - 5.4 [Lokasi & Panduan Rute (Location & Navigation)](#54-lokasi--panduan-rute-location--navigation)
6. [Integrasi Webhook & Deep Link WhatsApp](#6-integrasi-webhook--deep-link-whatsapp)
7. [Checklist Aksesibilitas & Human Interaction (WCAG 2.1)](#7-checklist-aksesibilitas--human-interaction-wcag-21)
8. [Panduan Teknis Implementasi Frontend (Stack & Setup)](#8-panduan-teknis-implementasi-frontend-stack--setup)

---

## 1. RINGKASAN EKSEKUTIF & KARAKTER PRODUK

Website **Desa Wisata Lereng Asri** adalah portal web mobile-first yang dibangun untuk memecahkan kendala klasik calon wisatawan desa:
- Informasi simpang siur mengenai rute jalan (kelayakan untuk bus rombongan).
- Ketidakpastian tiket masuk (HTM) dan biaya terselubung.
- Proses reservasi paket wisata dan camping yang lambat.

### Tujuan Bisnis & Metrik Keberhasilan
- Mempercepat alur calon wisatawan dari pencarian info hingga terhubung ke pengelola BUMDes melalui WhatsApp dalam waktu < 2 menit.
- Memberikan transparansi tarif 100% tanpa biaya tersembunyi.
- Menyediakan panduan navigasi yang valid dan teruji untuk kendaraan roda dua, mobil pribadi, hingga bus pariwisata 50-seat.

---

## 2. PRINSIP DESAIN & ANTI-SLOP RULES

Sesuai standar kurasi `miqdadbadjuber/anti-slop`:
1. **No Artificial Glow & Neon Gradients:** Menghindari efek blur radial neon, gradien biru-ke-ungu generik, atau latar belakang gelap tanpa identitas brand.
2. **No Fake Badges & Misleading Dots:** Dilarang menempatkan dot berkedip (pulsing dot) yang tidak merepresentasikan status real-time. Tidak menggunakan capsule pill "AI-powered" atau sejenisnya.
3. **No Decorative Emoji Spam:** Teks antarmuka, heading, dan tombol bersih dari emoji dekoratif (seperti 🚀, 🔥, 📈). Menggunakan ikon SVG semantik yang relevan.
4. **Honest Copywriting:** Menggunakan Bahasa Indonesia yang bersahaja, hangat, dan otentik khas pedesaan Sunda/Jawa tanpa jargon korporat yang kaku.
5. **Touch-Target Integrity:** Seluruh tombol dan area interaktif memiliki target sentuh minimum **44px × 44px** untuk kemudahan pengoperasian satu tangan di smartphone.

---

## 3. DESIGN TOKENS & STYLE GUIDE

### 3.1 Palet Warna (Color Palette)

| Token Name | Hex Code | Tailwind Utility Class | Kegunaan |
|---|---|---|---|
| `primary` | `#184736` | `bg-[#184736]`, `text-[#184736]` | Warna primer identitas desa (Forest Green), tombol CTA utama, header |
| `primary-hover` | `#123629` | `hover:bg-[#123629]` | State interaksi hover/active tombol utama |
| `primary-container`| `#e4eee6` | `bg-[#e4eee6]` | Latar belakang chip, badge kategori, dan card aksen lembut |
| `surface` | `#f6fbf7` | `bg-[#f6fbf7]` | Warna dasar halaman (canvas background) |
| `surface-white` | `#ffffff` | `bg-white` | Container kartu konten dan card elevasi |
| `accent-earth` | `#8c4322` | `bg-[#8c4322]`, `text-[#8c4322]` | Aksen hangat khas tanah liat Sunda / kuliner lokal |
| `text-primary` | `#111827` | `text-gray-900` | Teks utama, judul, harga (Kontras > 7:1) |
| `text-secondary` | `#4b5563` | `text-gray-600` | Deskripsi pendukung, metadata, jarak tempuh |
| `text-muted` | `#9ca3af` | `text-gray-400` | Teks keterangan non-kritis dan border halus |
| `border-subtle` | `#e5e7eb` | `border-gray-200` | Garis pembatas kartu dan pemisah seksyen |

### 3.2 Tipografi (Typography)
- **Primary Font Family:** `Plus Jakarta Sans`, sans-serif (Google Fonts)
- **Hierarchy Scale:**
  - `H1 (Page Title)`: 22px – 24px | Font-Weight: 700 (Bold) | Line-Height: 1.25
  - `H2 (Section Title)`: 18px – 20px | Font-Weight: 700 (Bold) | Line-Height: 1.3
  - `H3 (Card Title)`: 15px – 16px | Font-Weight: 600 (SemiBold) | Line-Height: 1.4
  - `Body Text`: 14px | Font-Weight: 400 (Regular) & 500 (Medium) | Line-Height: 1.5
  - `Caption / Meta`: 12px – 13px | Font-Weight: 500 (Medium) | Line-Height: 1.4
  - `Badge / Tag`: 11px – 12px | Font-Weight: 600 (SemiBold) | Text-Transform: Normal (hindari all-caps ekstrim)

### 3.3 Geometri & Radius
- Card Konten: `rounded-2xl` (16px)
- Button & Action Chip: `rounded-xl` (12px)
- Badge Kategori: `rounded-lg` (8px)
- **Aturan:** Hindari penggunaan bentuk pil bulat penuh (`rounded-full`) untuk seluruh komponen agar hirarki visual tetap tegas.

---

## 4. ARSITEKTUR SHELL & NAVIGASI GLOBAL

Aplikasi web mobile menggunakan arsitektur shell tetap:

### 4.1 Fixed Top App Bar
- **Komponen:**
  - Logo Desa Wisata Lereng Asri (`width: 36px, height: 36px`)
  - Identitas Desa & Nama Halaman Aktif (`DESA WISATA - [Nama Menu]`)
  - Tombol Bantuan / Help (`aria-label="Pusat Bantuan"`)
  - Profil / Kontak Cepat (`aria-label="Kontak BUMDes"`)
- **Tinggi Bar:** 56px, `sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100`

### 4.2 Fixed Bottom Tab Bar (5 Menu Utama)
- **Komponen Navigasi:**
  1. **Beranda** (Route: `/` | Icon: Home SVG)
  2. **Destinasi** (Route: `/destinasi` | Icon: Mountain / Landscape SVG)
  3. **Paket** (Route: `/paket-wisata` | Icon: Ticket / Flag SVG)
  4. **Galeri** (Route: `/galeri` | Icon: Photo Album SVG)
  5. **Lokasi** (Route: `/lokasi` | Icon: Navigation Pin SVG)
- **Tinggi Bar:** 64px, `fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200`
- **Safe Area Padding:** Menambahkan `pb- safe` untuk perangkat iOS dengan home bar.

### 4.3 Floating Action Button (FAB)
- **Tombol Melayang:** Tombol hijau "Chat Desa" (`#22c55e` atau `#184736`)
- **Posisi:** Melayang di pojok kanan bawah (`bottom-20 right-4 z-30`), tinggi 44px dengan teks "Chat Desa" dan ikon WhatsApp.

---

## 5. SPESIFIKASI RINCI HALAMAN (SCREENS SPECIFICATION)

### 5.1 Beranda (Home)
- **Header Info Bar:** Indikator kondisi alam (`1.250 mdpl • Sejuk Alami`).
- **Hero Section:**
  - Gambar panorama lereng perbukitan dan hamparan sawah terasering.
  - Tagline ramah penyambutan warga desa.
  - CTA Utama: Direct WhatsApp BUMDes & Tombol sekunder "Jelajahi Paket".
- **Quick Metrics (2x2 Grid):**
  - Jarak tempuh dari kota (±45 menit)
  - Tiket masuk gerbang terjangkau (Mulai Rp 10.000)
  - Rekomendasi ulasan wisatawan (Nilai kepuasan tinggi)
  - Kapasitas parkir & fasilitas desa (2 Hektar)
- **Highlight Destinasi & Paket:** Menampilkan 3 kartu destinasi terpopuler dan 2 paket liburan unggulan.
- **Kutipan Ulasan Riil:** Menampilkan testimoni asli dari keluarga dan panitia rombongan.

### 5.2 Katalog Destinasi (Destinations)
- **Filter Bar:** Tab filter horizontal (`Semua Destinasi`, `Spot Alam & Foto`, `Edukasi & Kuliner`).
- **Daftar 5 Spot Utama:**
  1. **Kebun Teh Skywalk Puncak Asri:**
     - HTM: Rp 15.000 | Jam: 06.00 – 17.00 WIB
     - Fasilitas: Jembatan kayu 120m datar, dek foto 360 derajat.
     - Akses: 3 menit (120m) jalan kaki dari parkir utama.
  2. **Curug Bening Pelangi:**
     - HTM: Rp 20.000 | Jam: 07.30 – 16.30 WIB
     - Fasilitas: Kolam air dangkal ramah anak, sewa pelampung, gazebo tepian.
     - Akses: 6 menit (250m) jalan setapak bertangga landai.
  3. **Spot Sunrise Bukit Embun:**
     - HTM: Rp 15.000 | Jam: 04.30 – 08.30 WIB
     - Fasilitas: Dek kayu panorama lautan awan, warung seduh kopi hangat warga.
     - Akses: 4 menit (180m) dari titik drop jeep.
  4. **Agro Wisata Petik Stroberi:**
     - HTM: Rp 10.000 | Jam: 08.00 – 16.00 WIB
     - Fasilitas: Greenhouse ramah anak & lansia, timbangan panen per ons.
     - Akses: 1 menit (50m) jalur datar ramah kursi roda.
  5. **Pasar Kuliner Tradisional Lembah:**
     - HTM: Rp 10.000 | Buka: Sabtu & Minggu 07.00 – 14.00 WIB
     - Sajian: Nasi jagung, tiwul manis gula aren, tempe mendoan hangat, kopi robusta.
     - Akses: 2 menit (80m) dari parkir barat.

### 5.3 Paket Wisata & Harga (Tour Packages & Pricing)
Skema tarif transparan *all-in* tanpa biaya tambahan:
1. **Paket Santai Keluarga:**
   - **Harga:** Rp 150.000 / orang (Minimal 4 orang) | Durasi: 1 Hari Penuh
   - **Inklusif:** Tiket 4 spot utama, makan siang nasi liwet kastrol komplit ayam kampung, pemandu lokal, shuttle internal desa, asuransi BUMDes.
2. **Paket Outbound & Team Building:**
   - **Harga:** Rp 225.000 / orang (Minimal 20 orang) | Durasi: 1 Hari Penuh
   - **Inklusif:** Fasilitator berlisensi, sound system outdoor, fun games lumpur tradisional, makan prasmanan 2x, snack kelapa muda batok utuh, ruang bilas bersih & tim medis.
3. **Paket Camping Sejuk Lereng:**
   - **Harga:** Rp 350.000 / tenda (Kapasitas 4 orang) | Durasi: 2 Hari 1 Malam
   - **Inklusif:** Tenda dome double layer terpasang, 4 matras busa & sleeping bag bersih, colokan listrik per kavling, api unggun bersama, sarapan nasi uduk & kopi Arabika.
4. **Paket Edukasi Petani Cilik:**
   - **Harga:** Rp 85.000 / anak (Minimal 10 anak) | Durasi: Setengah Hari
   - **Inklusif:** Praktek tanam bibit padi lumpur dangkal aman, petik sayur hidroponik (bawa pulang), caping tani hias, kudapan ubi rebus & susu segar. Guru/pendamping gratis.
- **Fasilitas Umum Bebas Retribusi Tambahan:**
  - Musholla luas & bersih dengan mukena wangi.
  - 16 bilik toilet higienis air pegunungan dingin segar.
  - Parkir terpadu berpenjaga.
  - 12 gazebo bambu tepi sawah.
  - Wi-Fi publik desa di area sentral.

### 5.4 Lokasi & Panduan Rute (Location & Navigation)
- **Alamat Resmi:**
  `Jl. Raya Lereng Asri No. 88, Desa Sukamaju, Kec. Pegunungan Asri, Kabupaten Hijau Sejahtera (Kode Pos: 55672)`
- **Jam Buka Gerbang:** Setiap Hari, 06.00 – 18.00 WIB
- **Rute Kendaraan:**
  - **Dari Pusat Kota:** ±24 km (Estimasi 45 menit) via Ring Road Selatan. Aspal hotmix lebar 7.5 meter tanpa tikungan patah berbahaya, ramah bus pariwisata 50 seat.
  - **Dari Stasiun Kereta Utama:** ±18 km (Estimasi 30 menit). Tersedia angkutan desa kuning No. 05 atau shuttle mobil Elf resmi desa.
- **Fasilitas Area Parkir Terpadu 2 Hektar:**
  - Kapasitas: 40 Bus Besar (50 seat), 120 Mobil Pribadi, 300+ Sepeda Motor.
  - Pos tiket resmi, pantauan CCTV 24 jam, lounge khusus driver istirahat ber-AC, dan penitipan helm tanpa pungutan tambahan.
- **Integrasi Tombol Rute:**
  - Tombol "Buka Google Maps" (`intent: maps`)
  - Tombol "Buka di Waze" (`intent: waze`)
  - Hotline Posko Jalur Wisata (`tel:` & `wa.me`)

---

## 6. INTEGRASI WEBHOOK & DEEP LINK WHATSAPP

- **Base URL:** `https://wa.me/6281234567890`
- **Nomor Call Center Resmi BUMDes:** `+62 812-3456-7890`

### 6.1 Template Query Parameter WhatsApp

#### A. Pemesanan Paket Santai Keluarga
```
https://wa.me/6281234567890?text=Halo%20Admin%20Desa%20Wisata%20Lereng%20Asri%2C%20saya%20ingin%20reservasi%20Paket%20Santai%20Keluarga%20(Rp150.000%2Forang).%0A-%20Nama%20Pemesan%3A%20%0A-%20Tanggal%20Kunjungan%3A%20%0A-%20Jumlah%20Orang%3A%20%0AMohon%20info%20ketersediaan%20kuota%20dan%20tata%20cara%20DP.%20Terima%20kasih!
```

#### B. Pemesanan Paket Outbound Komunitas / Kantor
```
https://wa.me/6281234567890?text=Halo%20BUMDes%20Lereng%20Asri%2C%20kami%20dari%20instansi%2Fkomunitas%20ingin%20menanyakan%20Paket%20Outbound%20%26%20Team%20Building%20(Rp225.000%2Forang).%0A-%20Nama%20Instansi%2FKomunitas%3A%20%0A-%20Rencana%20Tanggal%3A%20%0A-%20Estimasi%20Peserta%3A%20%20Orang%0AMohon%20kirimkan%20dokumen%20proposal%20resmi%20dan%20invoice%20penawaran.%20Terima%20kasih!
```

#### C. Pemesanan Paket Camping Sejuk Lereng
```
https://wa.me/6281234567890?text=Halo%20Admin%20Lereng%20Asri%2C%20saya%20ingin%20booking%20Paket%20Camping%20Sejuk%20Lereng%20(Rp350.000%2Ftenda).%0A-%20Tanggal%20Menginap%3A%20%0A-%20Jumlah%20Tenda%3A%20%0A-%20Nama%20Ketua%20Rombongan%3A%20%0ATerima%20kasih.
```

#### D. Panduan Navigasi & Koordinasi Rombongan Bus
```
https://wa.me/6281234567890?text=Halo%20Posko%20Jaga%20Lereng%20Asri%2C%20kami%20rombongan%20bus%20pariwisata%20sedang%20dalam%20perjalanan%20menuju%20desa.%20Posisi%20saat%20ini%20berada%20di%20%5BLokasi%5D.%20Mohon%20info%20kondisi%20lalu%20lintas%20dan%20slot%20parkir%20bus.%20Terima%20kasih!
```

---

## 7. CHECKLIST AKSESIBILITAS & HUMAN INTERACTION (WCAG 2.1)

- [x] **Touch Target Size:** Seluruh tombol navigasi, card action, dan tab filter memiliki tinggi minimal 44px dengan padding sentuh luas.
- [x] **Color Contrast Ratio:** Teks utama (`#111827`) di atas latar putih/hijau muda mencapai rasio kontras 10.4:1 (melebihi batas minimum WCAG AAA 7:1).
- [x] **Keyboard & Screen Reader:** Seluruh ikon SVG tombol memiliki atribut `aria-label` deskriptif (misal: `aria-label="Reservasi via WhatsApp"`).
- [x] **Non-Text Content:** Seluruh tag `<img>` wajib memiliki atribut `alt` kontekstual yang mendeskripsikan foto pemandangan, kuliner, dan fasilitas.
- [x] **No Flashing Content:** Bebas dari animasi berkedip lebih dari 3 kali per detik untuk mencegah pemicu kejang fotosensitif.

---

## 8. PANDUAN TEKNIS IMPLEMENTASI FRONTEND (STACK & SETUP)

### 8.1 Stack yang Direkomendasikan
- **Framework:** Next.js (App Router) / Vite + React / Nuxt.js / SvelteKit / Vanilla HTML + Tailwind
- **CSS Engine:** Tailwind CSS v3.4+
- **Icons:** Lucide Icons (stroke: 1.75px atau 2px) atau SVG inline teroptimasi
- **Image Optimization:** WebP format dengan resolusi bertingkat (responsive srcset)

### 8.2 Konfigurasi Tailwind CSS (`tailwind.config.js`)
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,html}",
  ],
  theme: {
    extend: {
      colors: {
        lereng: {
          primary: '#184736',
          'primary-hover': '#123629',
          'primary-container': '#e4eee6',
          surface: '#f6fbf7',
          earth: '#8c4322',
          'earth-hover': '#723419',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
      }
    },
  },
  plugins: [],
}
```

### 8.3 Cara Ekspor Dokumen Ini ke Format PDF
1. **Menggunakan Markdown Viewer / VS Code:**
   - Buka dokumen ini di VS Code, gunakan ekstensi *Markdown PDF* atau *Markdown Preview Enhanced*.
   - Klik kanan > **Markdown PDF: Export (pdf)**.
2. **Menggunakan Browser (Chrome/Edge):**
   - Buka file Markdown yang telah dirender di browser.
   - Tekan `Ctrl + P` (Windows) atau `Cmd + P` (Mac), pilih destinasi **Save as PDF** dengan margin *Default* dan opsi *Background graphics* dicentang.

---
*Dokumen ini diterbitkan secara resmi sebagai acuan tunggal (Single Source of Truth) untuk tim frontend engineer, QA tester, dan operasional pengelola BUMDes Desa Wisata Lereng Asri.*

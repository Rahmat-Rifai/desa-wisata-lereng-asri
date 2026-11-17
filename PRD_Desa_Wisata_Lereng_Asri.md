# Product Requirements Document (PRD)
## Website Desa Wisata Lereng Asri

---

### 1. Latar Belakang & Problem Statement
* **Masalah**: Informasi mengenai destinasi, fasilitas, rincian paket, dan harga Desa Wisata Lereng Asri saat ini tersebar secara sporadis di berbagai akun media sosial. Calon wisatawan kesulitan mengonfirmasi kejelasan info dan tarif, sehingga banyak yang mengurungkan niat dan membatalkan rencana kunjungan (*high drop-off rate*).
* **Solusi**: Membangun website resmi sebagai pusat informasi tunggal (*single source of truth*) yang menyajikan katalog destinasi, rincian paket, dan transparansi harga secara terpadu, dilengkapi tombol pemesanan langsung via WhatsApp.

---

### 2. Tujuan Produk (Product Objectives)
1. **Sentralisasi Informasi**: Menyediakan satu wadah resmi yang memuat seluruh informasi destinasi, fasilitas, dan harga secara transparan dan terbarui.
2. **Mengurangi Angka Batal Kunjung**: Memudahkan calon wisatawan mengambil keputusan liburan dengan cepat tanpa kebingungan mencari info di berbagai platform.
3. **Meningkatkan Konversi Pemesanan**: Mengarahkan minat pengunjung langsung ke proses pemesanan dengan sekali klik menuju WhatsApp pengelola.

---

### 3. Pengguna Sasaran (Target Users)
* **Calon Wisatawan**: Pengunjung (datang dari tautan media sosial/mesin pencari) yang membutuhkan kepastian info destinasi, rincian paket kegiatan, dan harga sebelum memesan via WhatsApp.
* **Pengelola / Pokdarwis (Admin)**: Pengelola desa yang memperbarui tarif, ketersediaan paket, dan melayani pesan pemesanan yang masuk melalui WhatsApp.

---

### 4. Kebutuhan Fungsional (Functional Requirements)
* **FR-01 (Katalog Destinasi & Daya Tarik)**: Sistem menampilkan daftar lengkap objek wisata (foto, jam operasional, lokasi Google Maps, dan tiket masuk).
* **FR-02 (Katalog Paket Wisata & Transparansi Harga)**: Sistem menampilkan paket wisata (agrowisata, edukasi, trekking) lengkap dengan rincian fasilitas (*include/exclude*), durasi, dan daftar harga yang jelas.
* **FR-03 (Tombol Pesan Instan WhatsApp / CTA)**: Sistem menyediakan tombol "Pesan Sekarang" / "Tanya Paket" di setiap laman destinasi/paket yang otomatis membuka chat WhatsApp narahubung dengan draf pesan otomatis (berisi nama paket & tanggal yang diminati).
* **FR-04 (Pencarian & Filter Cepat)**: Sistem menyediakan fitur pemfilteran paket berdasarkan kategori (keluarga, rombongan, petualangan) dan rentang harga.
* **FR-05 (FAQ & Panduan Kunjungan)**: Sistem menyediakan rubrik tanya-jawab seputar aturan kunjungan, rute/transportasi, dan fasilitas umum desa.
* **FR-06 (Panel Manajemen Konten / CMS Admin)**: Sistem menyediakan dashboard terproteksi login bagi pengelola untuk memperbarui informasi destinasi, paket, dan harga secara mandiri.

---

### 5. Kebutuhan Nonfungsional (Non-Functional Requirements)
* **NFR-01 (Mobile-First & Responsif)**: Desain diutamakan untuk layar smartphone (*mobile-first*), mengingat mayoritas pengunjung mengklik tautan dari bio media sosial (Instagram/TikTok).
* **NFR-02 (Kecepatan Muat / Performa)**: Halaman harus memuat dalam waktu < 2,5 detik pada koneksi internet seluler (4G).
* **NFR-03 (Kemudahan Navigasi / Usability)**: Pengunjung dapat menemukan info harga dan tombol WhatsApp maksimal dalam 2 kali klik dari halaman utama.
* **NFR-04 (Keamanan & Keandalan)**: Menggunakan protokol HTTPS/SSL dan memiliki target ketersediaan layanan (*uptime*) minimal 99,5%.

---

### 6. Hal di Luar Cakupan (Out of Scope)
* **Payment Gateway Terintegrasi**: Tidak ada pembayaran otomatis di dalam web (semua konfirmasi pembayaran ditangani langsung via WhatsApp pengelola).
* **Registrasi Akun Pengunjung**: Pengunjung tidak perlu membuat akun/login untuk melihat seluruh informasi dan memesan.
* **Aplikasi Mobile Mandiri**: Tidak ada pengembangan aplikasi native Android/iOS.
* **Sistem Manajemen Stok & Inventaris Ritel**: Tidak mencakup pengelolaan inventaris suvenir atau kasir toko fisik UMKM.

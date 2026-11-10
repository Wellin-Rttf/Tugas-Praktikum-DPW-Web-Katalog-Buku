# Rak Buku - Katalog Buku Digital

![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

**Rak Buku** adalah aplikasi web katalog buku interaktif yang memungkinkan pengguna untuk menjelajahi, mencari, memfilter, dan menyimpan buku favorit. Aplikasi ini juga dilengkapi dengan fitur catatan pribadi untuk setiap buku, dukungan mode gelap/terang, serta antarmuka yang sepenuhnya responsif.

---

## Tugas Praktikum

- **Nama:** Wellington Covernikus SImangunsong
- **NIM:** 25071102434
- **Kelas:** TI-C
- **Mata Kuliah:** Praktikum Desain dan Pemrograman Web

---

## Fitur Utama

- **Tampilanbuku-buku pilihan untuk memulai penjelajahan.

- Katalog dan pencarian untuk mencari buku berdasarkan judul atau penulis, serta memfilter berdasarkan genre menggunakan *chip filter*.

- Melihat sinopsis lengkap buku dan menambahkan catatan pribadi (komentar/kesan) yang tersimpan secara lokal.

- Menyimpan buku ke dalam daftar favorit dengan indikator *badge* pada navigasi.

- *Form* interaktif untuk menambahkan buku baru ke dalam katalog dengan validasi *real-time*.

- *Dark / Light Mode* yang preferensinya disimpan di *localStorage*.

- Desain responsif, di mana mobile enggunakan `Bottom Navigation`. *Desktop* menggunakan `Side Navigation`.

- **Semua data (buku tambahan, favorit, catatan, dan tema) disimpan di `localStorage` sehingga tidak hilang saat halaman di-*refresh*.

---

## Teknologi yang Digunakan

- **Frontend Framework:** React.js (dibangun dengan Vite)
- **Routing:** React Router DOM v6
- **Styling:** CSS3 dengan Custom Properties (Material Design 3 Tokens)
- **State Management:** React Hooks (`useState`, `useEffect`, `useLayoutEffect`)
- **Custom Hooks:** `useLocalStorage` (untuk sinkronisasi state dengan localStorage) dan `useTema` (untuk manajemen tema gelap/terang).
- **Icons:** Material Symbols Rounded

---

## 📂 Struktur Direktori

Proyek ini disusun dengan arsitektur yang modular dan mudah dipelihara:

src/
├── components/     # Komponen UI yang dapat digunakan ulang (AppBar, BukuCard, dll)
├── data/           # Data statis (daftar buku, genre, menu navigasi)
├── hooks/          # Custom React Hooks (useLocalStorage, useTema)
├── pages/          # Komponen halaman utama (Beranda, Katalog, DetailBuku, dll)
├── styles/         # File CSS global dan Design Tokens (Material Design 3)
├── App.jsx         # Routing utama dan state management global
└── main.jsx        # Entry point aplikasi

---

## Cara Menjalankan Proyek

Pastikan Anda telah menginstal [Node.js](https://nodejs.org/) di komputer Anda.

1. **Clone repository ini**
   
   ```bash
   git clone https://github.com/Wellin-Rttf/Tugas-Praktikum-DPW-Web-Katalog-Buku.git
   cd Tugas-Praktikum-DPW-Web-Katalog-Buku
   ```

2. **Instal dependensi**
   
   ```bash
   npm install
   ```

3. **Jalankan aplikasi di mode development**
   
   ```bash
   npm run dev
   ```

4. **Buka di browser**
   Buka tautan yang muncul di terminal (biasanya `http://localhost:5173`).
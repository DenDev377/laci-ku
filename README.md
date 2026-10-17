# 🗄️ LaciKu — Brankas Digital Barang Berharga, Struk & Garansi

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19.2-blue?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=for-the-badge&logo=tailwindcss" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Prisma-6.19-2d3748?style=for-the-badge&logo=prisma" alt="Prisma" />
  <img src="https://img.shields.io/badge/PostgreSQL-Database-336791?style=for-the-badge&logo=postgresql" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/NextAuth.js-v4-purple?style=for-the-badge&logo=auth0" alt="NextAuth" />
</p>

---

## 📖 Tentang LaciKu

**LaciKu** adalah aplikasi web manajemen inventaris pribadi (*personal vault*) yang dirancang untuk mencatat barang-barang berharga, nomor seri (Serial Number), foto fisik barang, serta menyimpan arsip digital struk kasir dan kartu garansi di satu tempat yang aman dan terorganisir.

### 💡 Masalah yang Diselesaikan:
1. **Struk Kasir Cepat Pudar:** Struk kertas thermal toko umumnya memudar dan tidak terbaca hanya dalam 3–6 bulan, sehingga garansi resmi sering ditolak.
2. **Nomor Seri Hilang Saat Dibutuhkan:** Saat barang hilang atau dicuri, pemilik sering lupa nomor seri (SN) / IMEI yang menjadi syarat utama pelaporan kepolisian dan klaim asuransi.
3. **Tracking Nilai Aset:** Membantu pengguna memantau total estimasi nilai harta bergerak yang dimiliki secara realtime.

---

## ✨ Fitur Utama

- 🏠 **Landing Page & Hero Section Interaktif:**
  - Desain modern dengan *Geist font*, animasi halus, dan showcase produk interaktif.
  - Ringkasan fitur, alur kerja 3 langkah, kategori aset, dan informasi keamanan.
- 🔐 **Autentikasi & Keamanan Berlapis:**
  - Registrasi akun dengan enkripsi password menggunakan **Bcrypt**.
  - Login berbasis sesi via **NextAuth.js** (Credentials Provider).
  - Proteksi rute otomatis menggunakan konvensi terbaru Next.js (`proxy.ts`). Pengguna yang belum login otomatis diarahkan ke `/auth/login`.
- 📊 **Dashboard Analitik Personal:**
  - Statistik *Total Barang*, *Estimasi Nilai Total (Rupiah)*, *Jumlah Kategori*, dan *Total Dokumen Tersimpan*.
  - Menampilkan daftar barang terakhir yang ditambahkan (*Recent Items*) dengan thumbnail gambar.
- 📦 **Manajemen Inventaris Lengkap (CRUD):**
  - **Tambah & Edit Barang:** Form terstruktur untuk nama barang, kategori, merek, nomor seri, harga beli, tanggal pembelian, lokasi penyimpanan, dan catatan tambahan.
  - **Multi-Upload Foto & Dokumen:** Mendukung unggah banyak foto fisik barang sekaligus dan lampiran file struk/garansi (PDF/Gambar).
  - **Hapus Barang:** Konfirmasi dialog aman dengan indikator loading.
- 📱 **100% Responsif & Mobile-First:**
  - **Mobile Card View:** Tampilan kartu khusus ponsel dengan tombol sentuh berukuran jempol (*touch-friendly* $\ge$ 44px).
  - **Desktop Table View:** Tabel data presisi untuk layar laptop/komputer.
  - **Salin Serial Number Cepat:** Tombol *1-tap copy* untuk memudahkan menyalin serial number tanpa repot mengetik ulang.
  - **Category Pills Swiper:** Bar filter kategori yang dapat digeser secara horizontal di layar ponsel.
- 🔍 **Pencarian Server-Side & Filter Cerdas:**
  - Kolom pencarian realtime yang memfilter berdasarkan nama barang, merek, nomor seri, maupun lokasi penyimpanan.
  - Filter cepat per kategori (*Elektronik, Kendaraan, Perhiasan, Dokumen, Furnitur, Lainnya*).
- ⚙️ **Pengaturan Profil & Keamanan:**
  - Ubah nama profil dengan sinkronisasi instan ke sesi login.
  - Ubah kata sandi dengan verifikasi password lama dan validasi panjang karakter.

---

## 🛠️ Tech Stack

| Lapisan | Teknologi | Keterangan |
| :--- | :--- | :--- |
| **Framework** | [Next.js 16](https://nextjs.org/) | App Router, Server Actions, Turbopack |
| **Library UI** | [React 19](https://react.dev/) | Hooks modern, `useTransition` |
| **Bahasa** | [TypeScript 5](https://www.typescriptlang.org/) | Type-safe end-to-end |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Modern `@import "tailwindcss"`, Geist Font |
| **Database** | [PostgreSQL](https://www.postgresql.org/) | Relational Database |
| **ORM** | [Prisma ORM 6](https://www.prisma.io/) | Schema modeling, migrasi, query builder |
| **Autentikasi** | [NextAuth.js v4](https://next-auth.js.org/) | JWT session, Credentials, Route protection |
| **Enkripsi** | [Bcryptjs](https://github.com/dcodeIO/bcrypt.js) | Password hashing |
| **Ikon** | [Lucide React](https://lucide.dev/) | Ikon vektor modern & konsisten |

---

## 📁 Struktur Direktori Proyek

```text
my-laci/
├── prisma/
│   └── schema.prisma            # Skema model Database Prisma
├── public/
│   └── uploads/                 # Direktori penyimpanan foto & dokumen struk
├── src/
│   ├── actions/                 # Next.js Server Actions
│   │   ├── auth.ts              # Action registrasi akun
│   │   ├── itemsAction.ts       # Action CRUD item & upload file
│   │   └── userAction.ts        # Action update profile & password
│   ├── app/                     # Next.js App Router
│   │   ├── api/auth/            # Route handler NextAuth [...nextauth]
│   │   ├── auth/                # Halaman login & register
│   │   ├── dashboard/           # Halaman dashboard (items, addItem, editItem, settings)
│   │   ├── globals.css          # Tailwind CSS & konfigurasi font
│   │   ├── layout.tsx           # Root layout & SessionProvider
│   │   └── page.tsx             # Landing Page (Hero, Features, CTA, Footer)
│   ├── components/              # Komponen UI Reusable
│   │   ├── dashboard/           # Card, NavbarDashboard, SidebarDashboard, TableItem, RecentItems
│   │   └── landing/             # HeroSection, LandingNavbar, FeaturesSection, HowItWorks, dll.
│   ├── generated/               # Generated client dari Prisma
│   ├── lib/
│   │   └── prisma.ts            # Prisma client singleton
│   ├── types/                   # Definisi tipe TypeScript
│   └── proxy.ts                 # Next.js 16 Route Protection Proxy (Middleware)
├── .env                         # Konfigurasi environment variables
├── package.json                 # Dependensi & skrip proyek
└── tsconfig.json                # Konfigurasi TypeScript
```

---

## 🗄️ Skema Database (Prisma)

Aplikasi memiliki 4 model utama:

```mermaid
erDiagram
    USER ||--o{ ITEM : "memiliki"
    ITEM ||--o{ PHOTO : "memiliki foto"
    ITEM ||--o{ DOCUMENT : "memiliki dokumen"

    USER {
        string id PK
        string email UK
        string name
        string password
        datetime createdAt
    }

    ITEM {
        string id PK
        string name
        Category category
        string brand
        string serialNumber
        datetime purchaseDate
        int purchasePrice
        string location
        string notes
        string userId FK
    }

    PHOTO {
        string id PK
        string url
        string itemId FK
    }

    DOCUMENT {
        string id PK
        string url
        string name
        DocType type
        string itemId FK
    }
```

**Kategori yang Didukung:**
- `ELEKTRONIK`
- `KENDARAAN`
- `PERHIASAN`
- `DOKUMEN`
- `FURNITUR`
- `LAINNYA`

---

## 🚀 Panduan Memulai (Getting Started)

### 1. Prasyarat
Pastikan sistem Anda telah terpasang:
- [Node.js](https://nodejs.org/) versi 18.18 atau lebih baru
- [PostgreSQL](https://www.postgresql.org/) database aktif
- `npm` atau package manager favorit Anda

### 2. Kloning Repositori
```bash
git clone https://github.com/username/my-laci.git
cd my-laci
```

### 3. Instalasi Dependensi
```bash
npm install
```

### 4. Konfigurasi Environment Variable
Buat file `.env` di root direktori proyek, sesuaikan konfigurasinya:

```env
# Koneksi Database PostgreSQL
DATABASE_URL="postgresql://postgres:password@localhost:5432/laciku?schema=public"

# Konfigurasi NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="buat_string_acak_panjang_rahasia_anda_disini"
```

> **Tips:** Anda dapat menghasilkan string acak untuk `NEXTAUTH_SECRET` menggunakan perintah:
> ```bash
> openssl rand -base64 32
> ```

### 5. Sinkronisasi Skema Database
Jalankan migrasi atau generate Prisma Client:
```bash
npx prisma generate
npx prisma db push
```

### 6. Jalankan Server Development
```bash
npm run dev
```
Buka browser dan akses [http://localhost:3000](http://localhost:3000).

---

## 🏗️ Build Produksi

Untuk memvalidasi dan membuat bundle produksi:

```bash
# Build aplikasi
npm run build

# Menjalankan server hasil build produksi
npm run start
```

---

## 🌐 Rute Halaman (Page Routes)

| Rute | Akses | Deskripsi |
| :--- | :---: | :--- |
| `/` | Publik | Landing page dengan Hero Section, fitur, dan info keamanan |
| `/auth/login` | Publik (Guest) | Halaman login akun |
| `/auth/register` | Publik (Guest) | Halaman registrasi pengguna baru |
| `/dashboard` | **Terproteksi** | Ringkasan statistik inventaris & barang terbaru |
| `/dashboard/items` | **Terproteksi** | Katalog barang lengkap, filter kategori & pencarian |
| `/dashboard/addItem` | **Terproteksi** | Form tambah barang, unggah foto & struk |
| `/dashboard/editItem/[id]` | **Terproteksi** | Form edit data barang & dokumen terkait |
| `/dashboard/settings` | **Terproteksi** | Pengaturan profil dan kata sandi pengguna |

---

## 🔒 Keamanan & Praktik Terbaik

- **Server-Side Authorization:** Setiap operasi mutasi data (create, update, delete) memverifikasi ID pengguna yang sedang login (`session.user.id`) untuk mencegah akses tidak sah (*IDOR protection*).
- **Password Hashing:** Menggunakan library `bcryptjs` dengan *salt* aman.
- **Route Guard:** Menggunakan `src/proxy.ts` untuk memblokir akses rute privat sebelum halaman di-render.
- **Validasi Dokumen:** Validasi tipe file dan ukuran dokumen pada sisi server.

---

## 📄 Lisensi

Proyek ini dibuat untuk keperluan pengelolaan inventaris personal dan portfolio. Silakan digunakan dan dikembangkan secara bebas sesuai kebutuhan Anda.

---

<p align="center">
  Dibuat dengan ❤️ untuk pemilik barang berharga di Indonesia.
</p>

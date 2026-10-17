# Design System & Guidelines (My Indekos)

Panduan desain visual, palet warna, tipografi, dan perilaku komponen antarmuka pengguna untuk My Indekos.

## 1. Prinsip Desain
- **Modern & Clean**: Antarmuka bersih, fokus pada keterbacaan data kamar, harga, dan ketersediaan.
- **Warm & Welcoming**: Menggunakan tone warna yang hangat, bersahabat, dan profesional untuk menciptakan kenyamanan seperti berada di rumah sendiri.
- **Responsif & Adaptif**: Nyaman digunakan di layar mobile (pencari kos di perjalanan) maupun desktop (pemilik kos memantau portfolio).
- **Aksesibilitas (a11y)**: Kontras warna terstandar, feedback pesan jelas via Sonner Toast, dan kontrol form yang ramah pembaca layar.

## 2. Palet Warna & Tema

Mendukung tema **Light** dan **Dark** mode melalui semantic color tokens Tailwind CSS:

| Token / Variabel | Light Mode | Dark Mode | Deskripsi |
| :--- | :--- | :--- | :--- |
| `background` | `#fdfcfb` / `#ffffff` | `#121212` / `#18181b` | Background dasar halaman |
| `foreground` | `#1c1917` (Stone 900) | `#f4f4f5` (Zinc 100) | Teks utama |
| `card` | `#ffffff` | `#1e1e24` | Background container / kartu |
| `primary` | Warna Terracotta / Amber hangat | Oranye hangat terkalibrasi | Aksen tombol utama, brand icon |
| `border` | Border lembut (`#e4e4e7`) | Border gelap (`#27272a`) | Garis pemisah komponen |
| `badge status` | Hijau (Kamar Kosong), Abu-abu (Penuh) | Hijau redup, Abu-abu gelap | Indikator ketersediaan |

## 3. Tipografi & Hierarki
- **Font Body**: Sans-serif modern (Inter / Geist Sans / system-ui).
- **Heading (`h1`, `h2`, `h3`)**: Tebal (*semi-bold* hingga *bold*) dengan tracking yang rapat untuk kesan tegas dan elegan.
- **Label / Badges**: Ukuran `text-xs` hingga `text-sm`, sering kali dikombinasikan dengan `uppercase` dan `tracking-wider` untuk status peran atau tipe properti.

## 4. Komponen Khusus My Indekos
- **Floating Controls (Pill)**: Komponen mengambang di bawah layar untuk navigasi cepat antar halaman utama, toggle tema instan, dan badge notifikasi.
- **PublicHeader (`src/components/public-header.tsx`)**:
  - Navbar terstandar untuk seluruh halaman di luar restricted/protected (`/`, `/properties`, `/fitur`, `/tentang`).
  - Layout:
    - *Brand/Logo*: Logo SVG Indekos + link ke `/`.
    - *Navigation*: Link berstatus aktif (`Beranda`, `Cari Kos`, `Fitur`, `Tentang`).
    - *Smart Auth CTA*: Menampilkan tombol "Masuk" jika pengguna adalah tamu, atau otomatis berubah menjadi "Ke Dashboard" bila sudah login.
    - *Mobile Responsive*: Dilengkapi drawer menu toggle (hamburger) dengan backdrop blur.
  - Tampilan: `sticky top-0 z-40`, border bawah transparan halus (`border-border/60`), dan glassmorphism `bg-background/80 backdrop-blur-md`.
  - **Standar Container Width (Layout Alignment)**:
    - Lebar navbar dibatasi pada `max-w-7xl` dengan horizontal padding `px-4 sm:px-6 lg:px-8`.
    - **Semua konten halaman publik** (`/`, `/properties`, `/fitur`, `/tentang`) **WAJIB** membungkus kontennya dengan `mx-auto max-w-7xl` dan padding `px-4 sm:px-6 lg:px-8` agar garis batas kiri dan kanan sejajar presisi dengan navbar di berbagai resolusi layar.
- **PasswordInput**: Input khusus kata sandi dengan toggle mata (*eye icon*) terintegrasi yang mudah diakses.
- **Modal Penempatan Kamar**: Dialog interaktif untuk owner memilih unit kamar kosong saat menyetujui calon penyewa.
- **Utility Cards (PLN / PDAM)**: Kartu status ringkas biaya bulanan dilengkapi visualisasi persentase konsumsi dan badge status pembayaran.

## 5. Standar Internasional Readability & Struktur Kode

Mengikuti Clean Code, Google & Airbnb TypeScript style guide, serta aturan linter industri (`max-lines`):

### Batasan Baris Per File (Max Lines per File)
1. **Page Orchestrator (`page.tsx`)**:
   - **Target: 30 – 60 baris** (Maksimal toleransi: 80 baris).
   - `page.tsx` bertindak sebagai *orchestrator/conductor*. File hanya merangkai metadata, container shell, dan komponen dari folder segmented `_components/`. Dilarang menulis ratusan baris markup JSX langsung di root `page.tsx`.
2. **Segmented Components (`_components/`)**:
   - Bagian UI yang hanya relevan untuk halaman terkait dikelompokkan ke dalam folder lokal `src/app/<route>/_components/` (misal: `_components/fitur-hero.tsx`, `_components/fitur-grid.tsx`, `_components/tentang-hero.tsx`, `_components/tentang-values.tsx`).
   - Setiap subkomponen fokus pada satu blok bagian dengan batas ideal **< 100 baris**.
3. **Reusable Domain Components (`src/components/`)**:
   - Komponen global seperti header, footer, modal, atau cards dibatasi idealnya **50 – 150 baris**.
4. **Logic Hooks & Helpers**:
   - Target **< 100 baris** per custom hook atau utility function.

### Standar Arsitektur Internasionalisasi (i18n Direct Type-Safe Jump)
1. **Direct Object Lookup (Anti "Magic String")**:
   - Menggunakan typed dictionary pattern: `src/i18n/id.ts` (source schema) dan `src/i18n/en.ts` (strictly typed).
   - Penggunaan di komponen:
     ```tsx
     const { t } = useTranslation()
     return <h1>{t.nav.home}</h1>
     ```
   - **Keunggulan**: Developer di VS Code bisa langsung menekan `Ctrl + Click` / `Cmd + Click` pada `t.nav.home` dan kursor langsung melompat (*jump-to-definition*) ke definisi katanya di `id.ts` atau `en.ts`.
2. **Language Persistence**:
   - Disimpan di `localStorage` (`my_indekos_locale`) dan disinkronkan secara realtime via `CustomEvent` tanpa me-reload seluruh halaman.

### Standar Arsitektur Konstanta (Constants Mirroring)
Struktur konstanta meniru (*mirroring*) langsung struktur halaman di bawah folder `src/app/`:
```text
src/constants/
├── public/
│   ├── nav/index.ts         <-- Route link navigasi publik & general
│   ├── login/index.ts       <-- Form keys, redirect routes, storage keys login
│   ├── register/index.ts    <-- Form keys registrasi
│   ├── properties/index.ts  <-- Filter default, pagination limit, routes
│   └── ...
├── protected/
│   ├── dashboard/index.ts   <-- Interval refresh, protected subroutes
│   └── ...
└── index.ts                 <-- Central barrel export untuk kemudahan import (@/constants)
```
- **Keunggulan**: Memudahkan pencarian (*predictable location*), menghindari *hardcoded magic string*, dan mendukung penuh `Ctrl + Click` untuk langsung menuju deklarasi nilai konstan.



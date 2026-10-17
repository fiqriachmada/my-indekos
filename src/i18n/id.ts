export const id = {
  common: {
    back: 'Kembali',
    save: 'Simpan',
    cancel: 'Batal',
    loading: 'Memuat...',
    active: 'Aktif',
    inactive: 'Nonaktif',
    search: 'Cari',
    reset: 'Reset',
  },
  nav: {
    home: 'Beranda',
    search: 'Cari Kos',
    features: 'Fitur',
    about: 'Tentang',
    login: 'Masuk',
    dashboard: 'Ke Dashboard',
  },
  landing: {
    badge: 'Sistem Manajemen Kos Modern & Transparan',
    heroTitle: 'Kelola operasional kos',
    heroSubtitle: 'tanpa rasa ribet',
    heroDesc:
      'Platform lengkap untuk pemilik kos dan penghuni. Pantau sewa kamar, kelola pembayaran utilitas, serta kelola izin dan permohonan kamar dalam satu atap.',
    exploreBtn: 'Jelajahi Kos Tersedia',
    loginBtn: 'Masuk Pemilik / Penghuni',
    openDashboard: 'Masuk ke Dashboard',
  },
  properties: {
    title: 'Cari Properti & Kamar Kos',
    subtitle: 'Jelajahi Indekos',
    desc: 'Temukan indekos yang nyaman, strategis, dan sesuai kebutuhan Anda.',
    searchPlaceholder: 'Cari berdasarkan nama kos atau lokasi...',
    allTypes: 'Semua Tipe',
    kosOnly: 'Kosan Saja',
    onlyAvailable: 'Hanya Kamar Tersedia',
    viewRooms: 'Lihat Kamar',
    applyRoom: 'Ajukan Sewa',
    showing: 'Menampilkan',
    of: 'dari',
    properties: 'properti',
    emptyTitle: 'Tidak ada kos yang cocok',
    emptyDesc: 'Coba sesuaikan kata kunci pencarian atau ganti filter Anda.',
  },
  features: {
    badge: 'Platform Cerdas Kos-Kosan',
    title: 'Fitur Lengkap untuk',
    highlight: 'Bisnis Kos Modern',
    desc: 'Tinggalkan cara manual buku catatan dan chat yang berantakan. My Indekos menyatukan semua kebutuhan operasional rumah kos dalam satu aplikasi terpadu.',
  },
  about: {
    badge: 'Tentang My Indekos',
    title: 'Menghubungkan Pemilik Kos dengan',
    highlight: 'Penghuni Bahagia',
    desc: 'My Indekos lahir dari kebutuhan nyata di lapangan: proses sewa kos tradisional seringkali memakan waktu, pencatatan pembayaran utilitas rentan selisih, dan komunikasi operasional sering terselip. Kami hadir untuk menyederhanakan semuanya.',
    visionBadge: 'Visi Kami',
    visionTitle: 'Menjadi Ekosistem Hunian Kos Terbaik',
    visionDesc:
      'Menjadi platform digital standar utama bagi pemilik kos mandiri maupun jaringan properti kos di Indonesia dalam menyajikan hunian yang teratur, aman, dan nyaman bagi generasi muda.',
    missionBadge: 'Misi Kami',
    missionTitle: 'Memberdayakan Pengelola & Penyewa',
    principlesTitle: 'Prinsip & Nilai Dasar',
  },
} as const

type DeepRecordString<T> = {
  [K in keyof T]: T[K] extends object ? DeepRecordString<T[K]> : string
}

export type TranslationSchema = DeepRecordString<typeof id>


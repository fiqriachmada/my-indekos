'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Compass,
  Search,
  Lock,
  Globe,
  ArrowRight,
  Home,
  Check,
  ChevronDown,
  Sparkles,
  HelpCircle,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

type RouteItem = {
  path: string
  label: string
  description: string
  category: 'public' | 'protected' | 'auth'
}

const ALL_ROUTES: RouteItem[] = [
  // Public
  { path: '/', label: 'Beranda', description: 'Halaman utama landing page My Indekos', category: 'public' },
  { path: '/properties', label: 'Cari Kos', description: 'Eksplorasi properti kos dan ketersediaan kamar', category: 'public' },
  { path: '/features', label: 'Fitur', description: 'Fitur lengkap ekosistem manajemen kos', category: 'public' },
  { path: '/about', label: 'Tentang Kami', description: 'Mengenal visi, misi, dan nilai My Indekos', category: 'public' },

  // Auth
  { path: '/login', label: 'Masuk (Login)', description: 'Masuk ke akun pemilik atau penghuni', category: 'auth' },
  { path: '/register', label: 'Daftar Akun', description: 'Buat akun baru pemilik atau calon penghuni', category: 'auth' },
  { path: '/forgot-password', label: 'Lupa Kata Sandi', description: 'Reset kata sandi akun', category: 'auth' },

  // Protected (Hanya muncul jika user login)
  { path: '/protected/dashboard', label: 'Dashboard Workspace', description: 'Ringkasan operasional kos dan status hunian', category: 'protected' },
  { path: '/protected/notifications', label: 'Notifikasi', description: 'Pemberitahuan aktivitas, permohonan sewa, dan tagihan', category: 'protected' },
  { path: '/protected/profile', label: 'Profil Saya', description: 'Informasi akun dan data diri pengguna', category: 'protected' },
  { path: '/protected/settings', label: 'Pengaturan Akun', description: 'Preferensi sistem, tema, dan keamanan', category: 'protected' },
  { path: '/protected/settings/profile', label: 'Ubah Profil', description: 'Kelola nama dan data profil', category: 'protected' },
  { path: '/protected/settings/password', label: 'Ubah Kata Sandi', description: 'Perbarui kata sandi akun Anda', category: 'protected' },
  { path: '/protected/settings/phone', label: 'Nomor WhatsApp / Telepon', description: 'Verifikasi nomor kontak aktif', category: 'protected' },
  { path: '/protected/settings/avatar', label: 'Ubah Foto Profil', description: 'Unggah dan sesuaikan foto profil', category: 'protected' },
  { path: '/protected/settings/theme', label: 'Tema Tampilan', description: 'Atur tema terang, gelap, atau sistem', category: 'protected' },
  { path: '/protected/settings/username', label: 'Ubah Username', description: 'Sesuaikan username akun Anda', category: 'protected' },
]

export default function NotFound() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const comboboxRef = useRef<HTMLDivElement>(null)

  // 1. Cek status autentikasi user
  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(Boolean(session?.user))
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(Boolean(session?.user))
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  // 2. Filter rute yang tersedia berdasarkan auth
  const availableRoutes = useMemo(() => {
    return ALL_ROUTES.filter((item) => {
      if (item.category === 'protected') {
        return isAuthenticated === true
      }
      return true
    })
  }, [isAuthenticated])

  // 3. Filter autocomplete search query
  const filteredRoutes = useMemo(() => {
    if (!query.trim()) return availableRoutes
    const lower = query.toLowerCase().trim()
    return availableRoutes.filter(
      (r) =>
        r.path.toLowerCase().includes(lower) ||
        r.label.toLowerCase().includes(lower) ||
        r.description.toLowerCase().includes(lower)
    )
  }, [availableRoutes, query])

  // 4. Tutup dropdown saat klik di luar
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (comboboxRef.current && !comboboxRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelectRoute = (path: string) => {
    setIsOpen(false)
    router.push(path)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      setIsOpen(true)
      return
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev + 1) % (filteredRoutes.length || 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev - 1 + filteredRoutes.length) % (filteredRoutes.length || 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (filteredRoutes[selectedIndex]) {
        handleSelectRoute(filteredRoutes[selectedIndex].path)
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-16 text-foreground transition-colors selection:bg-indigo-500/20">
      <div className="w-full max-w-xl text-center">
        {/* Badge 404 */}
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
          <Compass className="size-4 animate-spin-slow" />
          <span>404 — Halaman Tidak Ditemukan</span>
        </div>

        <h1 className="mt-4 font-serif text-4xl font-extrabold tracking-tight sm:text-5xl">
          Tersesat di alamat yang salah?
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground leading-relaxed sm:text-base">
          Halaman yang Anda tuju tidak tersedia atau telah dipindahkan. Gunakan pencarian cerdas rute di bawah ini untuk berpindah cepat:
        </p>

        {/* Combobox Auto Complete */}
        <div ref={comboboxRef} className="relative mt-8 text-left">
          <div className="relative flex items-center">
            <Search className="absolute left-4 size-5 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setIsOpen(true)
                setSelectedIndex(0)
              }}
              onFocus={() => setIsOpen(true)}
              onKeyDown={handleKeyDown}
              placeholder="Cari rute (misal: dashboard, cari kos, setting)..."
              className="w-full rounded-2xl border border-border bg-card/80 py-3.5 pl-12 pr-10 text-sm shadow-sm backdrop-blur-md transition-all outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:bg-card/40"
              aria-label="Pencarian rute"
              aria-expanded={isOpen}
              role="combobox"
            />
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label="Buka daftar rute"
              className="absolute right-3 rounded-lg p-1 text-muted-foreground hover:bg-muted"
            >
              <ChevronDown className={`size-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Autocomplete Dropdown List */}
          {isOpen && (
            <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-80 overflow-y-auto rounded-2xl border border-border bg-popover/95 p-2 shadow-2xl backdrop-blur-xl animate-in fade-in-0 zoom-in-95">
              <div className="flex items-center justify-between px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground border-b border-border/50 mb-1">
                <span>Rute Tersedia ({filteredRoutes.length})</span>
                <span className="flex items-center gap-1 normal-case font-normal text-xs">
                  {isAuthenticated ? (
                    <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                      <Check className="size-3" /> Termasuk Rute Protected
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Lock className="size-3" /> Login untuk rute protected
                    </span>
                  )}
                </span>
              </div>

              {filteredRoutes.length === 0 ? (
                <div className="py-6 text-center text-sm text-muted-foreground">
                  <p>Tidak ada rute yang cocok dengan kata kunci &quot;{query}&quot;.</p>
                </div>
              ) : (
                <ul role="listbox" className="space-y-1">
                  {filteredRoutes.map((route, idx) => {
                    const isSelected = idx === selectedIndex
                    const isProtected = route.category === 'protected'

                    return (
                      <li
                        key={route.path}
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => handleSelectRoute(route.path)}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`group flex cursor-pointer items-start justify-between rounded-xl px-3.5 py-2.5 text-xs transition-colors ${
                          isSelected
                            ? 'bg-indigo-50 text-indigo-950 dark:bg-indigo-950/60 dark:text-indigo-100'
                            : 'hover:bg-muted/70'
                        }`}
                      >
                        <div className="min-w-0 pr-3">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm">{route.label}</span>
                            <span
                              className={`rounded-md px-1.5 py-0.5 text-[10px] font-mono font-medium ${
                                isProtected
                                  ? 'bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300'
                                  : 'bg-muted text-muted-foreground'
                              }`}
                            >
                              {route.path}
                            </span>
                          </div>
                          <p className="mt-0.5 truncate text-muted-foreground">{route.description}</p>
                        </div>

                        <div className="flex shrink-0 items-center gap-1 pt-1 text-muted-foreground group-hover:text-foreground">
                          {isProtected ? (
                            <Lock className="size-3.5 text-purple-600 dark:text-purple-400" />
                          ) : (
                            <Globe className="size-3.5 text-slate-400" />
                          )}
                          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                        </div>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* Quick Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground shadow-xs transition hover:bg-primary/90"
          >
            <Home className="size-3.5" />
            Kembali ke Beranda
          </Link>
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-xs font-semibold text-foreground transition hover:bg-muted"
          >
            <Sparkles className="size-3.5" />
            Cari Kamar Kos
          </Link>
          {!isAuthenticated && (
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-xl border border-indigo-500/30 bg-indigo-50/50 px-5 py-2.5 text-xs font-semibold text-indigo-700 transition hover:bg-indigo-100/60 dark:bg-indigo-950/30 dark:text-indigo-300"
            >
              <Lock className="size-3.5" />
              Masuk untuk Buka Workspace
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

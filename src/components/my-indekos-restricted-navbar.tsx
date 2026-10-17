'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Home,
  Bell,
  Settings,
  LogOut,
  User,
  Search,
  Menu,
  X,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'

export function MyIndekosRestrictedNavbar({ children }: { children?: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [profile, setProfile] = useState<{
    id?: string
    username?: string
    display_name?: string
    first_name?: string
    avatar_url?: string | null
    email?: string
  } | null>(null)
  const [showAccountMenu, setShowAccountMenu] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const accountMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        supabase
          .from('profiles')
          .select('id, username, display_name, first_name, avatar_url')
          .eq('id', user.id)
          .maybeSingle()
          .then(({ data }) => {
            setProfile({
              id: user.id,
              email: user.email,
              username: data?.username,
              display_name: data?.display_name || data?.first_name,
              avatar_url: data?.avatar_url,
            })
          })
      }
    })
  }, [])

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target as Node)) {
        setShowAccountMenu(false)
      }
    }
    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    toast.success('Berhasil keluar')
    router.push('/login')
    router.refresh()
  }

  const navItems = [
    {
      label: 'Dashboard',
      href: '/protected/dashboard',
      icon: LayoutDashboard,
      isActive: pathname === '/protected/dashboard',
    },
    {
      label: 'Cari Kos',
      href: '/properties',
      icon: Home,
      isActive: pathname.startsWith('/properties'),
    },
    {
      label: 'Notifikasi',
      href: '/protected/notifications',
      icon: Bell,
      isActive: pathname.startsWith('/protected/notifications'),
    },
    {
      label: 'Pengaturan',
      href: '/protected/settings',
      icon: Settings,
      isActive: pathname.startsWith('/protected/settings'),
    },
  ]

  const displayName = profile?.display_name || profile?.username || 'Pengguna'

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo & Brand */}
          <div className="flex items-center gap-6">
            <Link href="/protected/dashboard" className="flex items-center gap-2.5">
              <img src="/icon.svg" alt="My Indekos" className="size-9 drop-shadow-xs" />
              <span className="font-bold tracking-tight text-lg text-indigo-600 dark:text-indigo-400">
                My Indekos
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden items-center gap-1 md:flex">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition ${
                      item.isActive
                        ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    <Icon size={15} />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2.5">
            {/* Account Menu */}
            <div ref={accountMenuRef} className="relative">
              <button
                type="button"
                onClick={() => setShowAccountMenu((curr) => !curr)}
                aria-label="Menu akun"
                aria-expanded={showAccountMenu}
                className="group relative flex size-9 items-center justify-center overflow-hidden rounded-full border border-border bg-card text-xs font-semibold text-foreground transition hover:ring-2 hover:ring-indigo-500"
              >
                {profile?.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt="Foto profil"
                    className="size-full object-cover"
                  />
                ) : (
                  (profile?.username ?? 'U').replace('@', '').slice(0, 2).toUpperCase()
                )}
              </button>

              {showAccountMenu && (
                <div
                  role="menu"
                  aria-label="Menu akun"
                  className="absolute right-0 top-11 z-50 w-52 rounded-2xl border border-border bg-popover p-2 text-popover-foreground shadow-xl"
                >
                  <div className="border-b border-border px-3 py-2">
                    <p className="truncate text-sm font-semibold">{displayName}</p>
                    <p className="truncate text-xs text-muted-foreground">{profile?.email}</p>
                  </div>
                  <Link
                    href="/protected/settings/profile"
                    role="menuitem"
                    onClick={() => setShowAccountMenu(false)}
                    className="mt-1 flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium hover:bg-muted"
                  >
                    <User size={14} /> Profil Saya
                  </Link>
                  <Link
                    href="/protected/settings"
                    role="menuitem"
                    onClick={() => setShowAccountMenu(false)}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium hover:bg-muted"
                  >
                    <Settings size={14} /> Pengaturan
                  </Link>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setShowAccountMenu(false)
                      void handleLogout()
                    }}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                  >
                    <LogOut size={14} /> Keluar
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              aria-label={mobileMenuOpen ? 'Tutup navigasi' : 'Buka navigasi'}
              onClick={() => setMobileMenuOpen((curr) => !curr)}
              className="flex size-9 items-center justify-center rounded-xl border border-border bg-muted/60 text-foreground md:hidden"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="border-t border-border bg-popover/95 px-4 py-3 shadow-lg backdrop-blur-lg md:hidden">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${
                      item.isActive
                        ? 'bg-indigo-50 font-semibold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
                        : 'text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  )
}

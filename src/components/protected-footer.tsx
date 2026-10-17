'use client'

import Link from 'next/link'

export function ProtectedFooter() {
  return (
    <footer className="border-t border-border bg-card py-6 text-center text-xs text-muted-foreground transition-colors">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} My Indekos Workspace. Hak Cipta Dilindungi.</p>
        <div className="flex flex-wrap items-center justify-center gap-4 font-medium">
          <Link href="/protected/dashboard" className="hover:text-foreground transition-colors">
            Dashboard
          </Link>
          <Link href="/properties" className="hover:text-foreground transition-colors">
            Cari Kos
          </Link>
          <Link href="/protected/notifications" className="hover:text-foreground transition-colors">
            Notifikasi
          </Link>
          <Link href="/protected/settings" className="hover:text-foreground transition-colors">
            Pengaturan
          </Link>
        </div>
      </div>
    </footer>
  )
}

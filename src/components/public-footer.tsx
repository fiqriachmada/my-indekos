import Link from 'next/link'

export function PublicFooter() {
  return (
    <footer className="border-t border-border bg-card py-8 text-center text-xs text-muted-foreground transition-colors">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row">
        <p>© {new Date().getFullYear()} My Indekos. Hak Cipta Dilindungi.</p>
        <div className="flex gap-4 font-medium">
          <Link href="/properties" className="hover:text-foreground transition-colors">
            Cari Kos
          </Link>
          <Link href="/features" className="hover:text-foreground transition-colors">
            Fitur
          </Link>
          <Link href="/about" className="hover:text-foreground transition-colors">
            Tentang
          </Link>
          <Link href="/login" className="hover:text-foreground transition-colors">
            Masuk
          </Link>
          <Link href="/register" className="hover:text-foreground transition-colors">
            Daftar
          </Link>
        </div>
      </div>
    </footer>
  )
}

import { SettingsNav } from './settings-nav'

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="py-10 pb-28 text-foreground transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">
          My Indekos
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Pengaturan Akun</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Kelola preferensi akun, keamanan, kontak, dan tampilan antarmuka.
        </p>

        <div className="mt-8 flex flex-col gap-6 md:flex-row">
          <SettingsNav />
          <section className="min-w-0 flex-1 rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs">
            {children}
          </section>
        </div>
      </div>
    </div>
  )
}

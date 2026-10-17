'use client'

import { useTranslation } from '@/i18n'
import {
  CheckBadgeIcon,
  HeartIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline'

export function TentangValues() {
  const { t, locale } = useTranslation()

  const values = [
    {
      title: locale === 'en' ? 'Full Transparency' : 'Transparansi Penuh',
      desc:
        locale === 'en'
          ? 'Clear rental fees, explicit utility splits, and transparent tenant logs without hidden fees.'
          : 'Baik tarif sewa, pembagian biaya listrik dan air, hingga riwayat penghuni tercatat secara gamblang tanpa biaya tersembunyi.',
      icon: CheckBadgeIcon,
    },
    {
      title: locale === 'en' ? 'Community Harmony' : 'Kenyamanan Komunitas',
      desc:
        locale === 'en'
          ? 'Fostering a safe, orderly, and respectful co-living ecosystem between owners, staff, and occupants.'
          : 'Menciptakan ekosistem rumah kos yang aman, tertib, dan harmonis antara pemilik, penjaga, dan sesama anak kos.',
      icon: HeartIcon,
    },
    {
      title: locale === 'en' ? 'Reliable Tech' : 'Keandalan Teknologi',
      desc:
        locale === 'en'
          ? 'Powered by Supabase realtime persistence for prompt updates on transactions and room occupancy.'
          : 'Didukung basis data realtime Supabase untuk sinkronisasi seketika saat ada transaksi atau perubahan status kamar.',
      icon: ShieldCheckIcon,
    },
  ]

  const missionPoints =
    locale === 'en'
      ? [
          'Deliver automated room and utility tracking with zero technical friction.',
          'Help prospective tenants safely locate and verify ready-to-move-in rooms.',
          'Safeguard data privacy and financial records with modern security.',
        ]
      : [
          'Menyediakan automasi pencatatan kamar dan utilitas tanpa beban teknis.',
          'Mempermudah calon perantau menemukan kamar kos siap huni secara aman.',
          'Menjamin privasi data dan riwayat keuangan dengan infrastruktur modern.',
        ]

  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      {/* Visi & Misi */}
      <div className="grid gap-8 md:grid-cols-2">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            {t.about.visionBadge}
          </span>
          <h2 className="mt-2 text-2xl font-bold text-foreground">{t.about.visionTitle}</h2>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            {t.about.visionDesc}
          </p>
        </div>
        <div className="rounded-3xl border border-border bg-card p-8 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            {t.about.missionBadge}
          </span>
          <h2 className="mt-2 text-2xl font-bold text-foreground">{t.about.missionTitle}</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {missionPoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-indigo-600 dark:text-indigo-400 font-bold">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Nilai-nilai */}
      <div className="mt-16">
        <h2 className="text-center text-2xl font-bold">{t.about.principlesTitle}</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl border border-border bg-card p-6 text-center">
              <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-400">
                <v.icon className="size-6" />
              </div>
              <h3 className="mt-4 font-bold text-foreground">{v.title}</h3>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

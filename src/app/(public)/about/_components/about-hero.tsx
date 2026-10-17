'use client'

import { useTranslation } from '@/i18n'
import { BuildingOffice2Icon } from '@heroicons/react/24/outline'

export function AboutHero() {
  const { t } = useTranslation()

  return (
    <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
      <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50/70 px-3 py-1 text-xs font-bold text-indigo-700 dark:border-indigo-900/40 dark:bg-indigo-950/40 dark:text-indigo-300">
        <BuildingOffice2Icon className="size-3.5" />
        {t.about.badge}
      </span>
      <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
        {t.about.title} <span className="text-indigo-600 dark:text-indigo-400">{t.about.highlight}</span>
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg leading-relaxed">
        {t.about.desc}
      </p>
    </section>
  )
}

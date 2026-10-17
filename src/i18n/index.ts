'use client'

import { useEffect, useState } from 'react'
import { id, type TranslationSchema } from './id'
import { en } from './en'

export type Locale = 'id' | 'en'

export const LANG_KEY = 'my-indekos-language'
export const LANG_CHANGE_EVENT = 'my-indekos-language-change'

const dictionaries: Record<Locale, TranslationSchema> = {
  id,
  en,
}

export function readLocale(): Locale {
  if (typeof window === 'undefined') return 'id'
  const saved = window.localStorage.getItem(LANG_KEY)
  return saved === 'en' ? 'en' : 'id'
}

export function saveLocale(next: Locale) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(LANG_KEY, next)
  document.documentElement.lang = next
  window.dispatchEvent(new CustomEvent(LANG_CHANGE_EVENT, { detail: next }))
}

export function useTranslation() {
  const [locale, setLocale] = useState<Locale>('id')

  useEffect(() => {
    setLocale(readLocale())

    const handleSync = () => {
      setLocale(readLocale())
    }

    window.addEventListener(LANG_CHANGE_EVENT, handleSync)
    window.addEventListener('storage', handleSync)

    return () => {
      window.removeEventListener(LANG_CHANGE_EVENT, handleSync)
      window.removeEventListener('storage', handleSync)
    }
  }, [])

  const t = dictionaries[locale] ?? id

  const setLanguage = (next: Locale) => {
    setLocale(next)
    saveLocale(next)
  }

  const toggleLanguage = () => {
    const next = locale === 'id' ? 'en' : 'id'
    setLanguage(next)
  }

  return {
    t,
    locale,
    setLanguage,
    toggleLanguage,
  }
}

export { id, en }
export type { TranslationSchema }

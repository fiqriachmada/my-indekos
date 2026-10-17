'use client'

import { MyIndekosRestrictedNavbar } from '@/components/my-indekos-restricted-navbar'

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <MyIndekosRestrictedNavbar>{children}</MyIndekosRestrictedNavbar>
}

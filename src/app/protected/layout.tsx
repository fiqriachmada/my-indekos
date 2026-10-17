import { ProtectedHeader } from '@/components/protected-header'
import { ProtectedFooter } from '@/components/protected-footer'

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground transition-colors">
      <ProtectedHeader />
      <main className="flex-1">{children}</main>
      <ProtectedFooter />
    </div>
  )
}

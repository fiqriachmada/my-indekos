import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { NotificationsClient, type PageNotification } from './notifications-client'

export const metadata = {
  title: 'Notifikasi — My Indekos',
  description: 'Pusat notifikasi dan pengajuan sewa Anda.',
}

export default async function NotificationsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: notifications } = await supabase
    .from('notifications')
    .select('id, title, description, read, status, type, created_at, property_id, room_id, property:properties(name)')
    .eq('to_user_id', user.id)
    .order('created_at', { ascending: false })
    .returns<PageNotification[]>()

  return (
    <div className="py-8 pb-28 text-foreground transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <NotificationsClient initialNotifications={notifications ?? []} userId={user.id} />
      </div>
    </div>
  )
}

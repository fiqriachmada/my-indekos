import { redirect } from 'next/navigation'

export default function ProfileRedirectPage() {
  redirect('/protected/settings/profile')
}

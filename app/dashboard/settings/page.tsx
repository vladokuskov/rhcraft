import { SettingsNameChange } from '@/components/dashboard/settings-name-change-form'
import { SettingsSignOut } from '@/components/dashboard/settings-signout'
import { getCurrentUser } from '@/lib/session'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'rhcraft - Dashboard settings',
}

export default async function DashboardSettings() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="flex flex-col gap-3 w-60">
      Dashboard settings
      <Link href="/dashboard">Back to dashboard</Link>
      <SettingsNameChange userName={user.name} user={user} />
      <SettingsSignOut />
    </div>
  )
}

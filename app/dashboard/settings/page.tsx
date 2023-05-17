import { SettingsNameChange } from '@/components/dashboard/settings-name-change'
import { SettingsSignOut } from '@/components/dashboard/settings-signout'
import { getCurrentUser } from '@/lib/session'
import { redirect } from 'next/navigation'

export default async function DashboardSettings() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="flex flex-col gap-3 w-5/12">
      Dashboard settings
      <div>
        <p>User id: {user.id}</p>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Image url: {user.image}</p>
      </div>
      <SettingsNameChange userName={user.name} user={user} />
      <SettingsSignOut />
    </div>
  )
}

import { SettingsNameChange } from '@/components/dashboard/settings-name-change-form'
import { SettingsPictureChange } from '@/components/dashboard/settings-picture-change'
import { SettingsSignOut } from '@/components/dashboard/settings-signout'
import DashboardNameChangeLoading from '@/components/dashboard/skeletons/dashboard-name-change-loading'
import { getCurrentUser } from '@/lib/session'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

export const metadata = {
  title: 'rhcraft - Dashboard settings',
}

export default async function DashboardSettings() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <main className="flex flex-col w-full items-start justify-start gap-8">
      <div>
        <h2 className=" text-white text-3xl font-tabloid tracking-wider">
          SETTINGS
        </h2>
        <p className="font-sans text-neutral-500 font-semibold tracking-wide">
          User settings
        </p>
      </div>
      <Suspense fallback={<DashboardNameChangeLoading />}>
        <SettingsNameChange userName={user.name} user={user} />
      </Suspense>
      <Suspense fallback={<DashboardNameChangeLoading />}>
        <SettingsPictureChange userImage={user.image} user={user} />
      </Suspense>
      <SettingsSignOut />
    </main>
  )
}

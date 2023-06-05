import { SettingsNameChange } from '@/components/dashboard/settings-name-change-form'
import { SettingsPicture } from '@/components/dashboard/settings-picture'
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
    <main className="flex flex-col w-full items-start justify-start gap-8 max-w-[80rem] mx-auto my-0">
      <div>
        <h2 className=" text-white text-3xl font-tabloid tracking-wider">
          SETTINGS
        </h2>
        <p className="font-sans text-neutral-500 font-semibold tracking-wide">
          User settings
        </p>
      </div>
      <Suspense fallback={<DashboardNameChangeLoading />}>
        <SettingsNameChange userName={user.name} userId={user.id} />
      </Suspense>
      <Suspense fallback={<DashboardNameChangeLoading />}>
        <SettingsPicture userImage={user.image} userId={user.id} />
      </Suspense>
      <SettingsSignOut />
    </main>
  )
}

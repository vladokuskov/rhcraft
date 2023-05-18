'use client'

import { faFile } from '@fortawesome/free-regular-svg-icons'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { NavigationLink } from '../navigation-link'

const DashboardSidebar = () => {
  return (
    <aside className=" w-full flex flex-col items-start justify-center gap-3">
      <NavigationLink
        title="Drafts"
        destination="/dashboard"
        icon={faFile}
        variant="dashboard"
      />
      <NavigationLink
        title="Settings"
        destination="/dashboard/settings"
        icon={faGear}
        variant="dashboard"
      />
    </aside>
  )
}

export { DashboardSidebar }

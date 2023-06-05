'use client'

import { faFile } from '@fortawesome/free-regular-svg-icons'
import { faArrowLeftLong, faGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { usePathname } from 'next/navigation'
import { NavigationLink } from '../navigation-link'

const DashboardSidebar = () => {
  const pathname = usePathname()

  return (
    <aside className=" w-full flex flex-col items-start justify-center gap-3 mt-4">
      {pathname === '/dashboard' || pathname === '/dashboard/settings' ? (
        <>
          <NavigationLink
            variant="dashboard"
            href="/dashboard"
            disabled={pathname === '/dashboard'}
            title="Posts"
            className="w-full"
          >
            <FontAwesomeIcon icon={faFile} /> Posts
          </NavigationLink>
          <NavigationLink
            variant="dashboard"
            href="/dashboard/settings"
            disabled={pathname === '/dashboard/settings'}
            title="Settings"
            className="w-full"
          >
            <FontAwesomeIcon icon={faGear} /> Settings
          </NavigationLink>
        </>
      ) : (
        <NavigationLink
          variant="dashboard"
          href="/dashboard"
          title="Back to dashboard"
          className="w-full"
        >
          <FontAwesomeIcon icon={faArrowLeftLong} />
          Back
        </NavigationLink>
      )}
    </aside>
  )
}

export { DashboardSidebar }

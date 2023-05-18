'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IconDefinition } from '@fortawesome/free-regular-svg-icons'
import clsx from 'clsx'

type NavigationLink = {
  title: string
  destination: string
  variant?: 'nav' | 'default' | 'dashboard'
  icon?: IconDefinition
}

const NavigationLink = ({
  title,
  destination,
  variant = 'default',
  icon,
}: NavigationLink) => {
  const pathname = usePathname()

  return (
    <Link
      href={destination}
      title={title}
      aria-disabled={
        (variant === 'nav' || variant === 'dashboard') &&
        pathname === destination
      }
      className={clsx(
        'w-full inline-flex  hover:text-neutral-300 focus:text-neutral-300 hover:transition-colors ',
        {
          'font-sans tracking-wider text-lg font-bold text-white-100 justify-between items-center aria-disabled:text-neutral-500':
            variant === 'nav',
          'font-inter hover:underline underline-offset-2 text-white-100 justify-between items-center':
            variant === 'default',
          'gap-2 flex-row-reverse items-center justify-end w-full rounded text-white p-1 font-sans font-bold tracking-wide text-lg hover:text-neutral-300 focus::text-neutral-300':
            variant === 'dashboard',
          'cursor-default': variant === 'nav' && pathname === destination,
          'cursor-default bg-neutral-600 text-neutral-300 hover:text-neutral-300 hover:text-neutral-300':
            variant === 'dashboard' && pathname === destination,
        },
      )}
    >
      {title}
      {icon && (
        <span>
          <FontAwesomeIcon icon={icon} />
        </span>
      )}
    </Link>
  )
}

export { NavigationLink }

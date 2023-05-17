'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IconDefinition } from '@fortawesome/free-regular-svg-icons'

type NavigationLink = {
  title: string
  destination: string
  variant?: 'nav'
  icon?: IconDefinition
}

const NavigationLink = ({
  title,
  destination,
  variant = 'nav',
  icon,
}: NavigationLink) => {
  const pathname = usePathname()

  return (
    <Link
      href={destination}
      title={title}
      aria-disabled={variant === 'nav' && pathname === destination}
      className={`w-full inline-flex justify-between items-center text-white-100 font-sans font-bold tracking-wider hover:text-gray-300 focus:text-gray-300 hover:transition-colors aria-disabled:text-gray-400 ${
        variant === 'nav' && pathname === destination && 'cursor-default'
      } ${variant === 'nav' && 'text-lg'}`}
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

'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IconDefinition } from '@fortawesome/free-regular-svg-icons'

type NavigationLink = {
  title: string
  destination: string
  variant?: 'nav' | 'default'
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
      aria-disabled={variant === 'nav' && pathname === destination}
      className={`w-full inline-flex justify-between items-center  ${
        variant === 'nav'
          ? 'font-sans tracking-wider text-lg font-bold text-white-100'
          : variant === 'default'
          ? 'font-inter hover:underline underline-offset-2 text-white-100'
          : ''
      } hover:text-gray-300 focus:text-gray-300 hover:transition-colors aria-disabled:text-gray-500 ${
        variant === 'nav' && pathname === destination && 'cursor-default'
      }`}
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

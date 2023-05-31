'use client'

import Link, { LinkProps } from 'next/link'
import clsx from 'clsx'
import { ReactNode } from 'react'

interface HTMLAnchorTitleProps {
  title?: string
}

type linkVariants = 'regular' | 'nav' | 'dashboard'

interface NavigationLinkProps extends LinkProps, HTMLAnchorTitleProps {
  variant?: linkVariants
  className?: string
  children: ReactNode
  disabled?: boolean
}

const NavigationLink = ({
  variant = 'regular',
  className,
  children,
  disabled = false,
  ...props
}: NavigationLinkProps) => {
  return (
    <Link
      className={clsx(
        'inline-flex gap-2 hover:transition-colors items-center',
        variant === 'nav' &&
          `font-sans text-lg text-white-100 tracking-wider font-bold hover:text-neutral-300 focus:text-neutral-300 ${
            disabled &&
            'text-neutral-500 hover:text-neutral-500 focus:text-neutral-500 pointer-events-none'
          }`,
        variant === 'regular' &&
          'font-inter text-white-100 underline-offset-2 hover:text-neutral-300 hover:underline focus:underline focus:text-neutral-300',
        variant === 'dashboard' &&
          `font-sans text-white  text-lg p-1 rounded font-bold tracking-wide hover:text-neutral-300 focus:text-neutral-300 ${
            disabled &&
            'bg-neutral-700 !text-neutral-400 hover:text-neutral-400 focus:text-neutral-400 pointer-events-none '
          }`,

        className,
      )}
      {...props}
    >
      {children}
    </Link>
  )
}

export { NavigationLink }

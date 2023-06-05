'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NavigationLink } from '../navigation-link'
import { NavBarMenu } from './nav-menu'

const NavBar = () => {
  const pathname = usePathname()

  return (
    <nav className="flex bg-gray-960 h-12 items-center w-full fixed border-b border-white border-opacity-10 z-40">
      <div className="flex w-full max-w-[80rem] mx-auto my-0 justify-between items-center px-4 ">
        <Link href="/" className="flex items-center" title="Home">
          <Image
            src="/logo.svg"
            alt="Picture of logo"
            width={70}
            height={10}
            priority
          />
        </Link>
        <div className="flex items-center justify-center gap-4 max-sm:hidden">
          <NavigationLink
            variant="nav"
            href="/"
            disabled={pathname === '/'}
            title="Home"
          >
            HOME
          </NavigationLink>
        </div>
        <NavBarMenu />
      </div>
    </nav>
  )
}

export { NavBar }

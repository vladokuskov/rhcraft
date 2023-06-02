import { useClickOutside } from '@/hooks/useClickOutside'
import {
  faAngleRight,
  faBars,
  faClose,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { Button } from '../button'
import { NavigationLink } from '../navigation-link'

const NavBarMenu = () => {
  const pathname = usePathname()
  const NavBarMenuRef = useRef<HTMLDivElement>(null)

  const [isMenuOpen, setIsMenuOpen] = useClickOutside(NavBarMenuRef, false)

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  return (
    <div
      className="hidden max-sm:flex items-center justify-center "
      ref={NavBarMenuRef}
    >
      <Button
        variant="ghost"
        title={isMenuOpen ? 'Close menu' : 'Open menu'}
        size="small"
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className=" !text-3xl"
      >
        <FontAwesomeIcon icon={!isMenuOpen ? faBars : faClose} />
      </Button>
      {isMenuOpen && (
        <div className="absolute m-auto left-0 right-0 w-full bg-neutral-700 p-3 py-6 top-12 flex flex-col gap-5 tap border-b border-white border-opacity-10">
          <div className="flex flex-col gap-4 w-full px-3">
            <NavigationLink
              variant="nav"
              href="/"
              className=" justify-between"
              disabled={pathname === '/'}
              title="Home"
            >
              HOME <FontAwesomeIcon icon={faAngleRight} />
            </NavigationLink>
            <NavigationLink
              variant="nav"
              href="/blog"
              className=" justify-between"
              disabled={pathname === '/blog'}
              title="Blog"
            >
              BLOG <FontAwesomeIcon icon={faAngleRight} />
            </NavigationLink>
          </div>
        </div>
      )}
    </div>
  )
}

export { NavBarMenu }

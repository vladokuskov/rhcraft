import { usePathname } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBars,
  faClose,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef } from 'react'
import { useClickOutside } from '@/hooks/useClickOutside'
import { NavigationLink } from '../navigation-link'
import { Button } from '../button'

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
              destination="/"
              title="HOME"
              icon={faAngleRight}
              variant="nav"
            />
            <NavigationLink
              destination="/blog"
              title="BLOG"
              icon={faAngleRight}
              variant="nav"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export { NavBarMenu }

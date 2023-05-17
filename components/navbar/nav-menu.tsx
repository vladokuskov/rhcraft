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
      <button
        className="text-white-100 hover:text-gray-300 focus:text-gray-300 hover:transition-colors"
        title="Menu"
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        <FontAwesomeIcon icon={!isMenuOpen ? faBars : faClose} size="2x" />
      </button>
      {isMenuOpen && (
        <div className="absolute m-auto left-0 right-0 w-full bg-zinc-700 p-3 py-6 top-12 flex flex-col gap-5 tap border-b border-white border-opacity-10">
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

'use client'

import Image from 'next/image'
import Link from 'next/link'
import { NavigationLink } from './navigation-link'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="flex flex-col justify-between pt-14 bg-gray-960 items-center w-full border-t border-white border-opacity-10">
      <div className="flex w-full max-w-[80rem] mx-auto my-0 justify-between items-center px-4 ">
        <Link href="/" className="flex items-center" title="Home">
          <Image
            src="/logo.svg"
            alt="Picture of logo"
            width={90}
            height={10}
            priority
          />
        </Link>
        <div className="flex flex-col items-start justify-center gap-2">
          <NavigationLink title="Home" destination="/" />
          <NavigationLink title="Blog" destination="/blog" />
          <NavigationLink title="Dashboard" destination="/dashboard" />
          <a
            title="YouTube channel"
            href="https://www.youtube.com/@realminheart"
            target="_blank"
            className="font-inter hover:text-gray-300 focus:text-gray-300 hover:transition-colors hover:underline underline-offset-2"
          >
            YT Channel
          </a>
        </div>
      </div>
      <p className="justify-self-end font-roboto opacity-25 font-light text-sm tracking-wide py-4 pt-6">
        &copy; {`RealmInHeart(RHCraft) ${currentYear}`}
      </p>
    </footer>
  )
}

export { Footer }

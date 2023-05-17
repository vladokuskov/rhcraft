'use client'

import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="flex flex-col justify-between pt-14 bg-gray-960 h-12 items-center w-full h-40">
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
        <div className="flex flex-col items-start justify-center">
          <Link
            href="/"
            className="font-inter hover:text-gray-300 focus:text-gray-300 hover:transition-colors hover:underline underline-offset-2"
          >
            Home
          </Link>
          <Link
            href="/"
            className="font-inter hover:text-gray-300 focus:text-gray-300 hover:transition-colors hover:underline underline-offset-2"
          >
            Blog
          </Link>
        </div>
      </div>
      <p className="justify-self-end font-roboto opacity-25 font-light text-sm tracking-wide">
        &copy; {`RealmInHeart(RHCraft) ${currentYear}`}
      </p>
    </footer>
  )
}

export { Footer }

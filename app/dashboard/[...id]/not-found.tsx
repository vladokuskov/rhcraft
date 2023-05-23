import Image from 'next/image'
import Link from 'next/link'

export default function DashboardPostNotFound() {
  return (
    <div className=" w-full flex flex-col items-center justify-start gap-3 pt-8">
      <Image
        src="/logo.svg"
        width={100}
        height={50}
        alt="Picture of logo"
        priority
      />
      <h2 className="font-sans font-bolder text-2xl">Post not found</h2>
      <Link
        href="dashboard/"
        title="Back to posts"
        className="underline font-roboto hover:text-neutral-300 focus:text-neutral-300 "
      >
        Back to posts
      </Link>
    </div>
  )
}

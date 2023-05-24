import HomePostsList from '@/components/home/home-posts-list'
import Image from 'next/image'
import bannerImage from '../public/banner.webp'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLink } from '@fortawesome/free-solid-svg-icons'
import { Suspense } from 'react'
import HomePostsLoading from '@/components/home/skeletons/home-posts-skeleton'

export const metadata = {
  title: 'rhcraft',
  description:
    'RHCraft - the ultimate Minecraft server for survival. We offer a unique and engaging experience for players of all skill levels',
  keywords: ['Minecraft', 'RealmInHear', 'RHCraft', 'Survival', 'Server'],
}

export default async function Home() {
  return (
    <div className=" w-full flex flex-col items-center justify-center gap-8">
      <section className="w-full flex items-start justify-center gap-8 max-lg:flex-col-reverse mt-8">
        <div className="relative w-full flex items-center justify-center">
          <Image
            className="rounded relative bg-neutral-700"
            src={bannerImage}
            height={400}
            alt="Banner picture"
            priority
          />
        </div>
        <div className="w-full flex flex-col items-start justify-start gap-4">
          <h1 className=" text-5xl font-sans font-bold flex flex-col items-start justify-start text-white-100">
            WELCOME TO<span className=" text-[#E4DE39]">RHCraft!</span>
          </h1>
          <p className=" max-w-[28rem] font-sans text-lg text-neutral-500 font-semibold leading-5">
            Welcome to our private Minecraft server, a haven for you and your
            friends to embark on unforgettable adventures together! Step into a
            vast and meticulously crafted world, where creativity knows no
            bounds and endless possibilities await.
          </p>
        </div>
      </section>
      <section className="w-full flex flex-col items-start justify-center gap-8 mt-8 mb-12">
        <div className="w-full flex flex-col items-start justify-start gap-1">
          <h2 className=" text-4xl font-sans font-bold flex flex-col items-start justify-start text-white-100">
            Latest news
          </h2>
          <p className="font-sans text-md text-neutral-500 font-medium font-semibold leading-4">
            Check out our blog for the latest news and updates
          </p>
        </div>
        <Suspense fallback={<HomePostsLoading />}>
          <HomePostsList />
        </Suspense>
        <Link
          href="/blog"
          className=" self-center font-sans font-bold tracking-wide text-white-100 hover:text-neutral-400 transition-colors text-lg flex items-center justify-center gap-4 whitespace-nowrap"
        >
          See more
          <FontAwesomeIcon icon={faExternalLink} />
        </Link>
      </section>
    </div>
  )
}

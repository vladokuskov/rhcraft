import Image from 'next/image'
import bannerImage from '../public/banner.webp'
import { Suspense } from 'react'
import BlogPostsLoading from '@/components/home/skeletons/blog-posts-skeleton'
import BlogPostsList from '@/components/home/blog-posts-list'

export const metadata = {
  title: 'rhcraft',
  description:
    'RHCraft - the ultimate Minecraft server for survival. tep into a vast and meticulously crafted world, where creativity knows no bounds and endless possibilities await.',
  keywords: ['Minecraft', 'RealmInHear', 'RHCraft', 'Survival', 'Server'],
}

export const revalidate = 600
export const dynamic = 'force-dynamic'

export default async function Home() {
  return (
    <div className=" w-full flex flex-col items-center justify-center gap-8 !overflow-y-hidden overflow-hidden">
      <section className="w-full flex items-start justify-center gap-8 max-lg:flex-col-reverse mt-8 ">
        <div className="relative flex items-center justify-center w-screen h-[50vh] ">
          <Image
            quality={100}
            fill
            priority
            placeholder="blur"
            className=" -z-1 object-cover max-sm:object-bottom object-center"
            src={bannerImage}
            alt="Banner picture"
          />
          <div className=" relative flex flex-col items-center justify-center gap-4 ">
            <Image
              src="/logo.svg"
              alt="Picture of logo"
              width={120}
              height={50}
              priority
            />
            <h1 className=" text-5xl font-sans font-bold flex max-sm:flex-col items-start justify-start text-white-100 !overflow-y-hidden">
              WELCOME TO
              <span className=" text-[#E4DE39] ml-2 max-sm:ml-0">RHCraft!</span>
            </h1>
          </div>
        </div>
      </section>
      <section className="w-full flex flex-col items-start justify-center gap-8 mt-8 mb-12 p-4 max-w-[80rem] mx-auto my-0 ">
        <div className="w-full flex flex-col items-start justify-start gap-1">
          <h2 className=" text-4xl font-sans font-bold flex flex-col items-start justify-start text-white-100">
            Latest news
          </h2>
          <p className="font-sans text-md text-neutral-500 leading-4">
            Check out our blog for the latest news and updates
          </p>
        </div>
        <Suspense fallback={<BlogPostsLoading />}>
          <BlogPostsList />
        </Suspense>
      </section>
    </div>
  )
}

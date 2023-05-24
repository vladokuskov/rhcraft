import HomePostsList from '@/components/home/home-posts-list'
import Image from 'next/image'
import bannerImage from '../public/banner.webp'

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
        <div className="relative w-full flex items-center justify-center ">
          <Image
            className="rounded relative border-2 border-inherit border-neutral-300"
            src={bannerImage}
            height={400}
            alt="Banner picture"
            priority
          />
        </div>
        <div className="w-full flex flex-col items-start justify-start gap-4">
          <h1 className=" text-5xl font-sans font-bold flex flex-col items-start justify-start text-white-100">
            WELCOME TO<span className=" text-yellow-400">RHCraft!</span>
          </h1>
          <p className=" max-w-[28rem] font-sans text-lg text-neutral-500 font-medium font-semibold leading-4">
            the ultimate Minecraft server for survival. We offer a unique and
            engaging experience for players of all skill levels
          </p>
        </div>
      </section>
      <section className="w-full flex flex-col items-start justify-center gap-8 mt-8">
        <div className="w-full flex flex-col items-start justify-start gap-1">
          <h2 className=" text-4xl font-sans font-bold flex flex-col items-start justify-start text-white-100">
            Latest news
          </h2>
          <p className="font-sans text-md text-neutral-500 font-medium font-semibold leading-4">
            Check out our blog for the latest news and updates
          </p>
        </div>
        <HomePostsList />
      </section>
    </div>
  )
}

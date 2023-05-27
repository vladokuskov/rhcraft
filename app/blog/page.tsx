import BlogSidebar from '@/components/blog/blog-sidebar'
import BlogPostsList from '@/components/blog/blog-posts-list'
import BlogPostsLoading from '@/components/blog/skeletons/blog-posts-skeleton'
import { Suspense } from 'react'

export const metadata = {
  title: 'rhcraft - Blog',
  description:
    'RHCraft - the ultimate Minecraft server for survival. tep into a vast and meticulously crafted world, where creativity knows no bounds and endless possibilities await.',
  keywords: ['Minecraft', 'RealmInHear', 'RHCraft', 'Survival', 'Server'],
}

export const revalidate = 600
export const dynamic = 'force-dynamic'
export default async function Blog() {
  return (
    <div className="w-full h-full min-h-screen mx-auto my-0 grid grid-cols-withSidebar max-sm:flex max-sm:gap-8 flex-col items-start justify-center gap-16">
      <BlogSidebar />
      <div className="w-full h-1 w-full h-full min-h-screen flex flex-col items-start justify-start">
        <Suspense fallback={<BlogPostsLoading />}>
          <BlogPostsList />
        </Suspense>
      </div>
    </div>
  )
}

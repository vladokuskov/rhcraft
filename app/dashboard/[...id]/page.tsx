import { CreatePostForm } from '@/components/dashboard/create-post-form'
import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'
import { notFound, redirect } from 'next/navigation'

export const metadata = {
  title: 'rhcraft - Dashboard create post',
}

async function getPostFromParams(params: any) {
  const id = params?.id?.join('/')

  const post = await db.post.findUnique({
    where: {
      id: id,
    },
  })

  if (!post) {
    null
  }

  return post
}

export default async function DashboardCreationPage({
  params,
}: {
  params: string
}) {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  const post = await getPostFromParams(params)

  if (!post) {
    notFound()
  }

  return (
    <div className=" flex flex-col w-full gap-3">
      <CreatePostForm post={post} />
    </div>
  )
}

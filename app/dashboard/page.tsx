import DraftsList from '@/components/dashboard/drafts-list'
import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'rhcraft - Dashboard',
}

async function getAllPosts() {
  const posts = await db.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })

  if (!posts) {
    null
  }

  return posts
}

export default async function Dashboard() {
  const posts = getAllPosts()

  return (
    <div className=" flex flex-col w-full gap-3">
      <Link href="/">Back to Home page</Link>
      <Link href="/dashboard/create">Create post</Link>
      <Link href="/dashboard/settings">Settings</Link>
    </div>
  )
}

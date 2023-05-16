import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'
import { redirect } from 'next/navigation'

async function getRecentPosts() {
  const posts = await db.post.findMany({
    where: { published: false }, // change to true later
    orderBy: {
      createdAt: 'desc',
    },
    take: 3,
  })

  if (!posts) {
    null
  }

  return posts
}

export default async function Home() {
  const posts = await getRecentPosts()

  const user = await getCurrentUser()

  return (
    <>
      <p>Home page</p>
      {<p className=" text-blue-600">{user ? user.email : 'No user'}</p>}
      <ul className="flex flex-col gap-5">
        {posts &&
          posts.map((post) => (
            <li key={post.id}>
              <p>Post id: {post.id}</p>
              <p>Post title: {post.title}</p>
              <p>Post date: {post.createdAt.toDateString()}</p>
            </li>
          ))}
      </ul>
    </>
  )
}

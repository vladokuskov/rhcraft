import { db } from '@/lib/db'
import Link from 'next/link'

async function getRecentPosts() {
  const posts = await db.post.findMany({
    where: { published: true },
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      title: true,
      createdAt: true,
      author: true,
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

  return (
    <>
      <p>Home page</p>

      <ul className="flex flex-col gap-5">
        {posts &&
          posts.map((post) => (
            <li key={post.id}>
              <p>Post id: {post.id}</p>
              <p>Post title: {post.title}</p>
              <p>Post date: {post.createdAt.toDateString()}</p>
              <Link href={`blog/${post.id}`}>open post</Link>
            </li>
          ))}
      </ul>
    </>
  )
}

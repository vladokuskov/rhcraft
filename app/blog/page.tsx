import { db } from '@/lib/db'

async function getAllPosts() {
  const posts = await db.post.findMany({
    where: { published: false }, // change to true later
    orderBy: {
      createdAt: 'desc',
    },
  })

  if (!posts) {
    null
  }

  return posts
}

export default async function Blog() {
  const posts = await getAllPosts()

  return (
    <>
      <p>Blog page</p>
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

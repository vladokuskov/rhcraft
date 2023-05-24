import { db } from '@/lib/db'
import { Post } from '../post'

async function getRecentPosts() {
  const posts = await db.post.findMany({
    where: { published: true },
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

export const revalidate = 60

const HomePostsList = async () => {
  const posts = await getRecentPosts()

  if (!posts || posts.length == 0) {
    return <></>
  }

  return (
    <ul className="flex items-center justify-start gap-4 w-full">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </ul>
  )
}

export default HomePostsList as unknown as () => JSX.Element

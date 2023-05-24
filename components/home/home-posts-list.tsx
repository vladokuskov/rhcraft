import { db } from '@/lib/db'
import PostCard from '../post-card'
import Link from 'next/link'

async function getAuthorInfo(authorID: string | null) {
  if (authorID) {
    const author = db.user.findUnique({
      where: { id: authorID },
      select: {
        name: true,
        image: true,
      },
    })

    if (!author) {
      null
    }

    return author
  }
}

async function getRecentPosts() {
  const fetchedPosts = await db.post.findMany({
    where: { published: true },
    orderBy: {
      createdAt: 'desc',
    },
    take: 3,
  })

  if (!fetchedPosts) {
    return null
  }

  const posts = await Promise.all(
    fetchedPosts.map(async (fetchedPost) => {
      const author = await getAuthorInfo(fetchedPost.authorId)
      return { post: fetchedPost, author }
    }),
  )

  return posts
}

export const revalidate = 1800

const HomePostsList = async () => {
  const posts = await getRecentPosts()

  if (!posts || posts.length == 0) {
    return <></>
  }

  return (
    <ul className="no-scrollbar flex items-start justify-start gap-8 w-full overflow-x-auto p-2 pl-0">
      {posts.map((post) => (
        <PostCard key={post.post.id} post={post.post} author={post.author} />
      ))}
    </ul>
  )
}

export default HomePostsList as unknown as () => JSX.Element

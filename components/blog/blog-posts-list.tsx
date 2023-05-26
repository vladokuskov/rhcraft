import { Post } from '@prisma/client'
import PostCard from '../post-card'
import { checkEnvironment } from '@/utils/checkEnviroment'

async function fetchData() {
  try {
    const response = await fetch(checkEnvironment().concat('/api/posts'), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Request failed with status ' + response.status)
    }

    const data = await response.json()

    return data as Post[]
  } catch (error) {
    console.error(error)
  }
}

const BlogPostsList = async () => {
  const posts = await fetchData()

  if (!posts) {
    return <></>
  }

  return (
    <ul className="flex flex-wrap items-start justify-start gap-8 w-full p-2 pl-0">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </ul>
  )
}

export default BlogPostsList as unknown as () => JSX.Element

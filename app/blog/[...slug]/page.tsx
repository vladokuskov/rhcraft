import { db } from '@/lib/db'
import { notFound } from 'next/navigation'
import { marked } from 'marked'

interface PostPageProps {
  params: {
    id: string[]
  }
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

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params)

  if (!post) {
    notFound()
  }

  return (
    <>
      <p>Post detail page</p>
      <ul>
        {post && (
          <>
            <li key={post.id}>
              <p>Post id: {post.id}</p>
              <p>Post title: {post.title}</p>
            </li>
          </>
        )}
      </ul>
    </>
  )
}

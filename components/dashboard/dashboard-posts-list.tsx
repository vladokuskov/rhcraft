import { DashboardPost } from './dashboard-post'

import { db } from '@/lib/db'

async function getAllPosts() {
  const posts = db.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      title: true,
      createdAt: true,
    },
  })

  if (!posts) {
    null
  }

  return posts
}

const DashboardPostsList = async () => {
  const posts = await getAllPosts()

  if (!posts || posts.length == 0) {
    return <></>
  }

  return (
    <ul className="flex flex-col gap-4 w-full">
      {posts.map((post) => (
        <DashboardPost
          key={post.id}
          title={post.title}
          date={post.createdAt}
          id={post.id}
        />
      ))}
    </ul>
  )
}

export default DashboardPostsList as unknown as () => JSX.Element

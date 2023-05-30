import { Post } from '@prisma/client'
import Link from 'next/link'
import { PostTopicBadge } from './post-topic-badge'

interface PostCard {
  post: Post
}

const PostCard = ({ post }: PostCard) => {
  const createdAt = new Date(post.createdAt)
  return (
    <li>
      <Link href={`/blog/${post.id}`} title="Go to post">
        <div className="w-full rounded flex flex-col items-start justify-center min-w-[20rem] max-w-[20rem] z-10  bg-neutral-700 hover:bg-neutral-600   focus:bg-neutral-60 transition-colors border-2 border-neutral-600">
          <div className="flex flex-col items-start justify-start p-2 gap-4  w-full">
            {post.topic && <PostTopicBadge topic={post.topic} />}
            <h4 className="font-sans text-white-100 text-lg font-semibold leading-5">
              {post.title}
            </h4>
            <p className="font-sans text-neutral-400 leading-3">
              {`${createdAt.toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}`}
            </p>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default PostCard

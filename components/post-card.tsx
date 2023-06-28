import { Post } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import { PostTopicBadge } from './post-topic-badge'
import clsx from 'clsx'

interface PostCard {
  post: Post
}

const PostCard = ({ post }: PostCard) => {
  const createdAt = new Date(post.createdAt)
  return (
    <article className="max-sm:w-full max-sm:min-w-full max-sm:max-w-full">
      <Link
        href={`/posts/${post.id}`}
        title="Go to post"
        className="max-sm:w-full max-sm:min-w-full max-sm:max-w-full"
      >
        <article
          className={clsx(
            `w-full rounded flex flex-col items-start justify-center max-w-[20rem] min-w-[20rem] z-10  bg-neutral-700 hover:bg-neutral-600   focus:bg-neutral-60 transition-colors border-2 border-neutral-600`,
            'max-sm:max-w-full max-sm:min-w-full',
          )}
        >
          {post.imageURL && (
            <div className="relative h-[10rem] w-full">
              <Image
                className=" rounded-t object-cover bg-neutral-500"
                src={post.imageURL}
                alt="Post picture"
                fill
              />
            </div>
          )}
          <div className="flex flex-col items-start justify-start p-2 gap-4  w-full">
            {post.topic && <PostTopicBadge topic={post.topic} />}
            <h4 className="font-sans text-white-100 text-lg font-semibold leading-5 w-full">
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
        </article>
      </Link>
    </article>
  )
}

export default PostCard

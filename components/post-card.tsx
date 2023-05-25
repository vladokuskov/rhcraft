import { Post } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

interface PostCard {
  post: Post
  author?: null | {
    name: string | null
    image: string | null
  }
}

const PostCard = ({ post, author }: PostCard) => {
  return (
    <li>
      <Link href={`/blog/${post.id}`} title="Go to post">
        <div className=" w-full rounded flex flex-col items-start justify-center max-w-[24rem] min-w-[20rem] z-10  bg-neutral-700 hover:bg-neutral-600   focus:bg-neutral-60 transition-colors border-2 border-neutral-600">
          {post.imageURL && (
            <Image
              className=" rounded-t w-full h-full max-h-44 object-cover"
              src={post.imageURL}
              alt="Post picture"
              width={400}
              height={240}
            />
          )}
          <div className="flex flex-col items-start justify-start p-2 gap-2  w-full">
            <div className="flex items-center justify-center gap-2">
              {author?.image && (
                <div className="w-8 h-8">
                  <Image
                    className=" rounded-full w-full h-full z-20"
                    src={author?.image}
                    alt="Author picture"
                    width={30}
                    height={30}
                    priority
                  />
                </div>
              )}
              <div className="flex flex-col items-start justify-start gap-1">
                <p className="font-sans text-base font-semibold text-orange-200 leading-4">
                  {author?.name}
                </p>
                <p className="font-sans text-neutral-400 leading-3">
                  {`${post.createdAt.toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}`}
                </p>
              </div>
            </div>
            <div className="font-sans text-white-100 mt-2">
              <h4 className="text-lg font-semibold leading-5">{post.title}</h4>
            </div>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default PostCard

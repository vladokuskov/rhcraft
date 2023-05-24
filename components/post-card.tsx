import { Post } from '@prisma/client'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

const getMetadata = (title: string): Metadata => {
  return {
    title: title,
    keywords: ['Minecraft', 'RealmInHear', 'RHCraft', 'Survival', 'Server'],
  }
}

interface PostCard {
  post: Post
  author?: null | {
    name: string | null
    image: string | null
  }
}

const PostCard = ({ post, author }: PostCard) => {
  return (
    <Link href={`/blog/${post.id}`} title="Go to post">
      <div className=" rounded flex flex-col items-start justify-center bg bg-neutral-700 max-w-[24rem] min-w-[20rem] z-10  hover:bg-neutral-600 focus:bg-neutral-60 transition-colors">
        {post.imageURL && (
          <Image
            src={post.imageURL}
            alt="Post picture"
            width={400}
            height={240}
          />
        )}
        <div className="flex flex-col items-start justify-start p-2 gap-2">
          <div className="flex items-center justify-start gap-2">
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
            <div>
              <p className="font-sans text-base font-semibold text-orange-200">
                {author?.name}
              </p>
            </div>
          </div>
          <div className="font-sans text-white-100">
            <h4 className="text-lg font-semibold leading-5">{post.title}</h4>
            <p>{post.content?.toString()}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default PostCard

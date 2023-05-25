import { db } from '@/lib/db'
import { parseEditorJson } from '@/utils/parseEditorJson'
import { Post } from '@prisma/client'
import Image from 'next/image'
import { notFound } from 'next/navigation'

interface Element {
  type: string
  text: string
}

interface PostPageProps {
  params: {
    id: string[]
  }
}

interface Params {
  id?: string[]
}

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

async function getPostFromParams(params: Params): Promise<{
  post: Post
  author: { name: string | null; image: string | null }
} | null> {
  const id = params?.id?.join('/')

  const fetchedPost = await db.post.findUnique({
    where: {
      id: id,
    },
  })

  if (!fetchedPost) {
    return null
  }

  const author = await getAuthorInfo(fetchedPost.authorId)

  if (!author) {
    return null
  }

  return { post: fetchedPost, author }
}
export const revalidate = 600
export const dynamic = 'force-dynamic'

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params)

  if (!post) {
    notFound()
  }

  if (!post.post || !post.post.content) {
    return null
  }

  const content = (await parseEditorJson(post.post.content)) as Element[]

  return (
    <div className=" mt-4 w-full flex flex-col items-start justify-start gap-4 mb-12">
      {post.post.imageURL && (
        <div className=" w-full max-h-96 h-full rounded flex items-start justify-start ml-0 object-contain">
          <Image
            src={post.post.imageURL}
            alt="Picture of post preview"
            width={600}
            height={300}
            className="rounded bg-neutral-700"
            priority
          />
        </div>
      )}

      <div className=" w-full flex flex-col items-start justify-start gap-4">
        <div className="flex items-center justify-center gap-2">
          {post.author?.image && (
            <div className="w-8 h-8">
              <Image
                className=" rounded-full w-full h-full z-20"
                src={post.author?.image}
                alt="Author picture"
                width={30}
                height={30}
                priority
              />
            </div>
          )}
          <div className="flex flex-col items-start justify-start gap-1">
            <p className="font-sans text-base font-semibold text-orange-200 leading-4">
              {post.author?.name}
            </p>
            <p className="font-sans text-neutral-400 leading-3">
              {`${post.post.createdAt.toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}`}
            </p>
          </div>
        </div>
        <h1 className="font-inter font-medium tracking-wide text-2xl leading-7">
          {post.post.title}
        </h1>
        <div className="w-full max-w-[50rem] font-roboto flex flex-col justify-start items-start gap-2">
          {content &&
            content.map(
              (element: { type: string; text: string }, index: number) => {
                if (element.type === 'header') {
                  return (
                    <h3
                      key={index}
                      className=" text-[#d9d9d9] text-2xl font-medium "
                    >
                      {element.text}
                    </h3>
                  )
                } else if (element.type === 'paragraph') {
                  return (
                    <p key={index} className=" text-[#c1c1c1] tracking-wide">
                      {element.text}
                    </p>
                  )
                } else if (element.type === 'list') {
                  console.log(element.text)
                  return (
                    <ol key={index}>
                      <li className=" text-[#c1c1c1] tracking-wide">
                        {element.text}
                      </li>
                    </ol>
                  )
                }
                return null
              },
            )}
        </div>
        <p className="font-sans text-neutral-400 leading-3 mt-8 whitespace-nowrap">
          Last updated:
          {` ${post.post.updatedAt.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          })}`}
        </p>
      </div>
    </div>
  )
}

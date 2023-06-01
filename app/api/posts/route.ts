import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { z } from 'zod'

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)

    const take = url.searchParams.get('take')
    const lastCursor = url.searchParams.get('lastCursor')
    const searchQuery = url.searchParams.get('searchQuery')

    if (searchQuery && searchQuery.length > 0) {
      const result = await db.post.findMany({
        where: {
          published: true,
          title: {
            search: 'has',
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      })

      return new Response(
        JSON.stringify({
          data: result,
        }),
        { status: 200 },
      )
    }

    // let result = await db.post.findMany({
    //   where: {
    //     published: true,
    //   },
    //   take: take ? parseInt(take as string) : 10,
    //   ...(lastCursor && {
    //     skip: 1,
    //     cursor: {
    //       id: lastCursor as string,
    //     },
    //   }),
    //   orderBy: {
    //     createdAt: 'desc',
    //   },
    // })

    // if (result.length === 0) {
    //   return new Response(
    //     JSON.stringify({
    //       data: [],
    //       metaData: {
    //         lastCursor: null,
    //         hasNextPage: false,
    //       },
    //     }),
    //     { status: 200 },
    //   )
    // }

    // const lastPostInResults = result[result.length - 1]
    // const cursor = lastPostInResults.id

    // const nextPage = await db.post.findMany({
    //   where: {
    //     published: true,
    //   },
    //   take: take ? parseInt(take as string) : 7,
    //   skip: 1,
    //   cursor: {
    //     id: cursor,
    //   },
    //   orderBy: {
    //     createdAt: 'desc',
    //   },
    // })

    // const data = {
    //   data: result,
    //   metaData: {
    //     lastCursor: cursor,
    //     hasNextPage: nextPage.length > 0,
    //   },
    // }

    // return new Response(JSON.stringify(data), { status: 200 })
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return new Response(null, { status: 403 })
    }

    const body = await req.json()

    // create post
    const post = await db.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: session.user.id,
      },
      select: {
        id: true,
      },
    })

    return new Response(JSON.stringify(post))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}

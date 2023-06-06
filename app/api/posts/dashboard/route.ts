import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    // const session = await getServerSession(authOptions)

    // if (!session?.user) {
    //   return NextResponse.json(
    //     { error: 'User not authenticated.' },
    //     { status: 403 },
    //   )
    // }

    const url = new URL(req.url)

    const take = url.searchParams.get('take')
    const lastCursor = url.searchParams.get('lastCursor')
    // const date = url.searchParams.get('date') as Date | null

    // if (date) {
    //   const todayStart = new Date(new Date(date).setHours(0, 0, 0, 0))
    //   const todayEnd = new Date(new Date(date).setHours(23, 59, 59, 999))

    //   let result = await db.post.findMany({
    //     take: take ? parseInt(take as string) : 10,
    //     ...(lastCursor && {
    //       skip: 1,
    //       cursor: {
    //         id: lastCursor as string,
    //       },
    //     }),
    //     orderBy: {
    //       createdAt: 'desc',
    //     },
    //     where: {
    //       createdAt: {
    //         gte: todayStart,
    //         lt: todayEnd,
    //       },
    //     },
    //   })

    //   if (result.length == 0) {
    //     return NextResponse.json(
    //       {
    //         data: [],
    //         metaData: {
    //           lastCursor: null,
    //           hasNextPage: false,
    //         },
    //       },
    //       { status: 200 },
    //     )
    //   }

    //   const lastPostInResults: any = result[result.length - 1]
    //   const cursor: any = lastPostInResults.id

    //   const nextPage = await db.post.findMany({
    //     take: take ? parseInt(take as string) : 7,
    //     skip: 1,
    //     cursor: {
    //       id: cursor,
    //     },
    //   })

    //   console.log(cursor)

    //   const data = {
    //     data: result,
    //     metaData: {
    //       lastCursor: cursor,
    //       hasNextPage: nextPage.length > 0,
    //     },
    //   }

    //   return NextResponse.json(data, { status: 200 })
    // }
    let result = await db.post.findMany({
      take: take ? parseInt(take as string) : 10,
      ...(lastCursor && {
        skip: 1,
        cursor: {
          id: lastCursor as string,
        },
      }),
      orderBy: {
        createdAt: 'desc',
      },
    })

    if (result.length == 0) {
      return NextResponse.json(
        {
          data: [],
          metaData: {
            lastCursor: null,
            hasNextPage: false,
          },
        },
        { status: 200 },
      )
    }

    const lastPostInResults: any = result[result.length - 1]
    const cursor: any = lastPostInResults.id

    const nextPage = await db.post.findMany({
      take: take ? parseInt(take as string) : 7,
      skip: 1,
      cursor: {
        id: cursor,
      },
    })

    const data = {
      data: result,
      metaData: {
        lastCursor: cursor,
        hasNextPage: nextPage.length > 0,
      },
    }

    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    return NextResponse.json({ status: 500 })
  }
}

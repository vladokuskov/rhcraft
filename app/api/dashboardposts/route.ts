import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { z } from 'zod'

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json(
        { error: 'User not authenticated.' },
        { status: 403 },
      )
    }

    const url = new URL(req.url)

    const take = url.searchParams.get('take')
    const lastCursor = url.searchParams.get('lastCursor')
    const date = url.searchParams.get('date') as Date | null

    if (date) {
      const selectedDate = new Date(date)
      const nextDay = new Date(selectedDate)
      nextDay.setDate(selectedDate.getDate() + 1)

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
        where: {
          createdAt: {
            gte: selectedDate,
            lt: nextDay,
          },
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
    }

    let result = await db.post.findMany({
      where: {
        published: true,
      },
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
      where: {
        published: true,
      },
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

export async function POST(req: Request) {
  return NextResponse.json({ status: 500 })
}

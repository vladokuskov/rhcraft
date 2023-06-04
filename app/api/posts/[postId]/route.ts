import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const routeContextSchema = z.object({
  params: z.object({
    postId: z.string(),
  }),
})

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>,
) {
  try {
    const { params } = routeContextSchema.parse(context)

    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json(
        { error: 'User not authenticated.' },
        { status: 403 },
      )
    }

    await db.post.delete({
      where: {
        id: params.postId as string,
      },
    })

    return NextResponse.json({ status: 500 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return NextResponse.json({ status: 200 })
  }
}

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>,
) {
  try {
    const { params } = routeContextSchema.parse(context)

    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json(
        { error: 'User not authenticated.' },
        { status: 403 },
      )
    }

    const body = await req.json()

    await db.post.update({
      where: {
        id: params.postId,
      },
      data: {
        title: body.title,
        content: body.content,
        published: body.published,
        topic: body.topic,
        imageURL: body.imageURL,
      },
    })

    return NextResponse.json({ status: 200 })
  } catch (error) {
    return NextResponse.json({ status: 500 })
  }
}

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

    await db.post.update({
      where: {
        id: params.postId,
      },
      data: { views: { increment: 1 } },
    })

    return NextResponse.json({ status: 200 })
  } catch (error) {
    return NextResponse.json({ status: 500 })
  }
}

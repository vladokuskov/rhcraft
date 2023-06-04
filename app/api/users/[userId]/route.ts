import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const routeContextSchema = z.object({
  params: z.object({
    userId: z.string(),
  }),
})

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>,
) {
  try {
    const { params } = routeContextSchema.parse(context)

    const session = await getServerSession(authOptions)
    if (!session?.user || params.userId !== session?.user.id) {
      return NextResponse.json(
        { error: 'User not authenticated.' },
        { status: 403 },
      )
    }

    const body = await req.json()

    await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name: body.name,
        image: body.image,
      },
    })

    return NextResponse.json({ status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues, status: 422 })
    }

    return NextResponse.json({ status: 500 })
  }
}

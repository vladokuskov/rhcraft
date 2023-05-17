import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { z } from 'zod'

export async function DELETE(req: Request) {
  try {
    // Validate the route context.

    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return new Response(null, { status: 403 })
    }

    const body = await req.json()

    // Delete post
    await db.post.delete({
      where: {
        id: body.postId,
      },
    })

    return new Response(null, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}

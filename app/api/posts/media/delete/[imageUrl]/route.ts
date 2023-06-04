import { NextRequest, NextResponse } from 'next/server'
import AWS from 'aws-sdk'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { z } from 'zod'

const routeContextSchema = z.object({
  params: z.object({
    imageUrl: z.string(),
  }),
})

export async function DELETE(
  request: NextRequest,
  context: z.infer<typeof routeContextSchema>,
) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return NextResponse.json(
      { error: 'User not authenticated.' },
      { status: 403 },
    )
  }

  const { params } = routeContextSchema.parse(context)

  if (params.imageUrl.length === 0) {
    return NextResponse.json(
      { error: 'Provide correct image URL.' },
      { status: 401 },
    )
  }

  try {
    const s3 = new AWS.S3({
      endpoint: process.env.BUCKET_ENDPOINT,
      accessKeyId: process.env.BUCKET_KEY_ID,
      secretAccessKey: process.env.BUCKET_SECRET_KEY,
      region: process.env.BUCKET_REGION,
    })

    await s3
      .deleteObject({
        Bucket: process.env.BUCKET_NAME as string,
        Key: params.imageUrl,
      })
      .promise()

    return NextResponse.json({ status: 200 })
  } catch (err) {
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 },
    )
  }
}

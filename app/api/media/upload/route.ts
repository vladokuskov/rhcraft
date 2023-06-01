import mime from 'mime'
import { NextRequest, NextResponse } from 'next/server'
import AWS from 'aws-sdk'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return NextResponse.json({ error: 'Not authenticated.' }, { status: 403 })
  }

  const formData = await request.formData()

  const file = formData.get('file') as Blob | null
  if (!file) {
    return NextResponse.json(
      { error: 'File blob is required.' },
      { status: 400 },
    )
  }

  const buffer = Buffer.from(await file.arrayBuffer())

  try {
    const s3 = new AWS.S3({
      endpoint: process.env.BUCKET_ENDPOINT,
      accessKeyId: process.env.BUCKET_KEY_ID,
      secretAccessKey: process.env.BUCKET_SECRET_KEY,
      region: process.env.BUCKET_REGION,
    })

    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    const filename = `${file.name.replace(
      /\.[^/.]+$/,
      '',
    )}-${uniqueSuffix}.${mime.getExtension(file.type)}`

    await s3
      .putObject({
        Bucket: process.env.BUCKET_NAME as string,
        Key: filename,
        Body: buffer,
      })
      .promise()

    return NextResponse.json({
      imageURL: `https://${process.env.BUCKET_NAME}.s3.${process.env.BUCKET_REGION}.backblazeb2.com/${filename}`,
    })
  } catch (err) {
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 },
    )
  }
}

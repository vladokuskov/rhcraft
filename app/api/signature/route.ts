import crypto from 'crypto'

export async function POST(req: Request) {
  const secret_api_key = process.env.BUCKET_API_SECRET_KEY
  try {
    const body = await req.json()

    const { timestamp } = body

    // Concatenate the parameters and API secret
    const signatureString = `timestamp=${timestamp}&upload_preset=ml_default${secret_api_key}`

    // Generate the signature using SHA1 algorithm
    const signature = crypto
      .createHash('sha1')
      .update(signatureString)
      .digest('hex')

    return new Response(JSON.stringify(signature))
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}

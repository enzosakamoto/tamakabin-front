import { Data } from '@/app/types/data'
import { clientPromise } from '@/database/mongo'
import { enviroments } from '@/utils/env/enviroments'

export async function POST(req: Request) {
  const { database, collection } = enviroments
  if (!req.body) return new Response('Request body is missing', { status: 400 })

  try {
    const body = (await req.json()) as Data
    const { umidity, temperature, brightness } = body

    if (!umidity) {
      return new Response('Missing umidity', { status: 400 })
    }

    if (!temperature) {
      return new Response('Missing temperature', { status: 400 })
    }

    if (!brightness) {
      return new Response('Missing brightness', { status: 400 })
    }

    if (
      typeof umidity !== 'number' ||
      typeof temperature !== 'number' ||
      typeof brightness !== 'number'
    ) {
      return new Response('Invalid data types', { status: 400 })
    }

    const client = await clientPromise
    const db = client.db(database)

    const timestampNow = Date.now()

    console.log('Received data:', {
      umidity,
      temperature,
      brightness,
      timestampNow
    })

    const response = await db.collection(collection).insertOne({
      umidity,
      temperature,
      brightness,
      timestamp: timestampNow
    })

    console.log('Data inserted:', response)
    return new Response('Data received successfully', { status: 200 })
  } catch (error) {
    return new Response('Invalid JSON', { status: 400 })
  }
}

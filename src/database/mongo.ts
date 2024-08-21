import { enviroments } from '@/utils/env/enviroments'
import { MongoClient } from 'mongodb'

const { mongodbUri } = enviroments

let client: MongoClient
let clientPromise: Promise<MongoClient>

try {
  client = new MongoClient(mongodbUri)
  clientPromise = client.connect()
} catch (error) {
  console.error('Error connecting to MongoDB:', error)
}

export { clientPromise }

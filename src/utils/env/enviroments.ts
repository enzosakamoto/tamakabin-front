export const enviroments = {
  mongodbUri: `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URI}`,
  database: process.env.MONGODB_DATABASE || '',
  collection: process.env.MONGODB_COLLECTION || ''
}

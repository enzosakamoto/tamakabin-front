if (
  !process.env.MONGODB_URI ||
  !process.env.MONGODB_USER ||
  !process.env.MONGODB_PASSWORD
) {
  throw new Error('Envs are missing')
}

export const enviroments = {
  mongodbUri: `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URI}`,
  database: 'tomferrite',
  collection: 'enzosakamoto'
}

import mongoose from 'mongoose'

const mongoUri = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/octofit_db'

export function connectToDatabase() {
  return mongoose.connect(mongoUri)
}

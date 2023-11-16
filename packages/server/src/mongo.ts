import mongoose from 'mongoose'

export async function setupMongo() {
  await mongoose.connect('mongodb://127.0.0.1:27017/dy-influencer-sys')
}

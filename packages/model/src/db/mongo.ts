import mongoose from 'mongoose'

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/todo')

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

main().catch(console.error)

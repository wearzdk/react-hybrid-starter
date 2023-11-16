import process from 'node:process'
import express from 'express'
import { setupMongo } from './mongo'
import { trpcExpressHandler } from '@/trpc'

const app = express()

// cors
function corsMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  if (req.method === 'OPTIONS')
    res.sendStatus(200)

  else
    next()
}

app.use(corsMiddleware)
// trpc
app.use('/trpc', trpcExpressHandler)

async function bootstrap() {
  console.log('connecting to mongodb')

  await setupMongo()
  console.log('Listening on http://localhost:3000')

  app.listen(3000)
}

try {
  bootstrap()
}
catch (err) {
  console.error(err)
  process.exit(1)
}

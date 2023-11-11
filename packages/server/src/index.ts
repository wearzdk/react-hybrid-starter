import * as trpcExpress from '@trpc/server/adapters/express'
import express from 'express'
import { router } from './trpc'

// 初始化数据库
import './db/mongo'
import { TodoRouters } from './dao/todo'

const app = express()

const appRouter = router({
  ...TodoRouters,
})

export type AppRouter = typeof appRouter

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
app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
  }),
)

console.log('Listening on http://localhost:3000')

app.listen(3000)

// 类型导出

export * from './dao'
export * from './trpc'

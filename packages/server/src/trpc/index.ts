import * as trpcExpress from '@trpc/server/adapters/express'
import { router } from './trpc'
import { createContext } from './context'
import { TodoRouters } from '@/api'

export * from './trpc'

const appRouter = router({
  todo: TodoRouters,
})

export type AppRouter = typeof appRouter

export const trpcExpressHandler = trpcExpress.createExpressMiddleware({
  router: appRouter,
  createContext,
})

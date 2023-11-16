import { TRPCError, initTRPC } from '@trpc/server'
import type { Context } from './context'

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.context<Context>().create()
/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */

const isAuth = t.middleware((opts) => {
  const { ctx } = opts
  if (!ctx.user)
    throw new TRPCError({ code: 'UNAUTHORIZED' })

  return opts.next({
    ctx: {
      user: ctx.user,
      userId: ctx.user.userId,
    },
  })
})

export const router = t.router
export const publicProcedure = t.procedure
export const authProcedure = t.procedure.use(isAuth)

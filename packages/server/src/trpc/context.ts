import type { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify'
import { jwtVerify } from './jwt'

export interface JwtClaims {
  userId: string
}

export async function createContext(ctx: CreateFastifyContextOptions) {
  const user = await jwtVerify<JwtClaims>(
    ctx.req.headers.authorization!,
  )

  return { user, userId: user?.userId }
}

export type Context = Awaited<ReturnType<typeof createContext>>

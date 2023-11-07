import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'

import type { AppRouter } from '~model/index'

export const Api = createTRPCProxyClient<AppRouter>({
  links: [httpBatchLink({ url: 'http://localhost:3000/trpc' })],
})

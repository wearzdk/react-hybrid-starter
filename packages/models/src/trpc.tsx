import type { AppRouter } from '@hybrid/server'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  createTRPCProxyClient,
  createTRPCReact,
  httpBatchLink,
} from '@trpc/react-query'
import React, { useState } from 'react'
import { HoxRoot } from 'hox'

// const URL = 'https://ai.massagebohe.top/trpc'
const URL = 'http://localhost:3000/trpc'

export const trpc = createTRPCReact<AppRouter>()

export const trpcNormal = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: URL,
    }),
  ],
})

export const TrpcProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: URL,
          maxURLLength: 4096,
        }),
      ],
    }),
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <HoxRoot>{children}</HoxRoot>
      </QueryClientProvider>
    </trpc.Provider>
  )
}

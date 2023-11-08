import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import { request } from '@tarojs/taro'
import type { AppRouter } from '~model/index'

export const Api = createTRPCProxyClient<AppRouter>({
  links: [httpBatchLink({ url: 'http://localhost:3000/trpc' })],
})

export async function NativeFetch(input: string, init: any) {
  return new Promise((resolve, reject) => {
    request({
      url: input,
      method: (init?.method || 'GET') as any,
      data: init?.body || {},
      header: {
        ...(init?.headers || {}),
      },
      success: (res) => {
        resolve({
          ok: true,
          status: res.statusCode,
          statusText: res.errMsg,
          json: () => Promise.resolve(res.data),
          text: () => Promise.resolve(res.data),
        } as any)
      },
      fail: (err) => {
        reject(new Error(err.errMsg))
      },
    })
  })
}

// eslint-disable-next-line no-restricted-globals
global.fetch = NativeFetch as any

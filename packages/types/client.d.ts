namespace clientEnv {
  type HttpMethod = 'get' | 'put' | 'post' | 'delete'

  // HTTPClient 需要默认封装好 Header
  type HttpClient = (
    url: string,
    params: Record<string, unknown>,
    body: Record<string, unknown>,
    method: HttpMethod,
    config?: { disableBaseUrl?: boolean },
  ) => Promise<Response>

  type StorageClear = (key: string) => Promise<void>
  type StorageSet = (key: string, value: string) => Promise<void>
  type StorageGet = (key: string) => Promise<string | null>
}

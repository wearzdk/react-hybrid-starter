let _storageClear: clientEnv.StorageClear | null = null
let _storageGet: clientEnv.StorageGet | null = null
let _storageSet: clientEnv.StorageSet | null = null

export function initStorage({
  storageClear,
  storageGet,
  storageSet,
}: {
  storageClear: clientEnv.StorageClear
  storageGet: clientEnv.StorageGet
  storageSet: clientEnv.StorageSet
}) {
  _storageClear = storageClear
  _storageGet = storageGet
  _storageSet = storageSet
}

export const storageClear: clientEnv.StorageClear = async (
  key: string,
) => {
  return _storageClear?.(key)
}

export const storageGet: clientEnv.StorageGet = async (key: string) => {
  return _storageGet?.(key) ?? null
}

export const storageSet: clientEnv.StorageSet = async (
  key: string,
  value: any,
) => {
  return _storageSet?.(key, value)
}

export function getZustandStorageAdapter() {
  return {
    setItem: (name: string, value: any) => {
      return storageSet(name, JSON.stringify(value))
    },
    getItem: (name: string) =>
      storageGet(name).then(res => (res ? JSON.parse(res) : null)),
    removeItem: storageClear,
  }
}

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getZustandStorageAdapter } from '../utils/storage'

export const useUserStore = create<{
  token: string | undefined
  hasLogin: () => boolean
  loginSetToken: (token: string) => void
}>()(
  persist(
    (set, get) => ({
      token: undefined as string | undefined,
      hasLogin: () => !!get().token,
      loginSetToken: (token: string) => {
        set({ token })
      },
    }),
    { name: 'User', storage: getZustandStorageAdapter() },
  ),
)

export function useHasLogin() {
  const token = useUserStore(t => t.token)
  return !!token
}

export function hasLogin() {
  return useUserStore.getState().hasLogin()
}

import type { User } from '@/types/User'
import { defineStore } from 'pinia'

export namespace UserStoreType {
  export type State = {
    loginUser: User | null
  }
  export type Getter = {}
  export type Action = {
    setLoginUser(payload: User): void
  }
}

export const useUserStore = defineStore<'user', UserStoreType.State, UserStoreType.Getter, UserStoreType.Action>(
  'user',
  {
    state: () => ({
      loginUser: null
    }),
    getters: {},
    actions: {
      setLoginUser(payload: User) {
        this.loginUser = payload
      }
    }
  }
)

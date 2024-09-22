import { defineStore } from 'pinia'

namespace Store {
  export type State = {
    globalLoading: boolean
  }
  export type Getter = {}
  export type Action = {
    setGlobalLoading(payload: boolean): void
  }
}

export const useSiteConfig = defineStore<'siteConfig', Store.State, Store.Getter, Store.Action>('siteConfig', {
  state: () => ({
    globalLoading: true
  }),
  actions: {
    setGlobalLoading(payload: boolean) {
      this.globalLoading = payload
    }
  }
})

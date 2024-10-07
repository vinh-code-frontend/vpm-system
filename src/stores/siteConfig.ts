import { defineStore } from 'pinia'

namespace Store {
  export type State = {
    loading: boolean
    isMenuCollapse: boolean
  }
  export type Getter = {}
  export type Action = {
    setLoading(payload: boolean): void
    setMenuCollapse(payload: boolean): void
  }
}

export const useSiteConfig = defineStore<'siteConfig', Store.State, Store.Getter, Store.Action>('siteConfig', {
  state: () => ({
    loading: false,
    isMenuCollapse: false
  }),
  actions: {
    setLoading(payload: boolean) {
      this.loading = payload
    },
    setMenuCollapse(payload) {
      this.isMenuCollapse = payload
    }
  }
})

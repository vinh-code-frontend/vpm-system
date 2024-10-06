import { defineStore } from 'pinia'

namespace Store {
  export type State = {}
  export type Getter = {}
  export type Action = {}
}

export const useSiteConfig = defineStore<'property', Store.State, Store.Getter, Store.Action>('property', {
  state: () => ({}),
  actions: {}
})

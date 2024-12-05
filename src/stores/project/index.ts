import { defineStore } from 'pinia'
import type { Store } from './types'

export const useProject = defineStore<Store.Name, Store.State, Store.Getter, Store.Action>('project', {
  state: () => ({}),
  actions: {}
})

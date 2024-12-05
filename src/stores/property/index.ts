import { defineStore } from 'pinia'
import type { Store } from './types'

export const useSiteConfig = defineStore<'property', Store.State, Store.Getter, Store.Action>('property', {
  state: () => ({
    categories: [],
    tags: []
  }),
  actions: {
    async getCategory() {},
    async addCategory() {},
    async updateCategory() {},
    async deleteCategory() {}
  }
})

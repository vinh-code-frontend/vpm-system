import type { ICategory, ITag } from '@/types/Property'
import { defineStore } from 'pinia'

namespace Store {
  export type State = {
    categories: ICategory[]
    tags: ITag[]
  }
  export type Getter = {}
  export type Action = {
    getCategory(): Promise<void>
    addCategory(): Promise<void>
    updateCategory(): Promise<void>
    deleteCategory(): Promise<void>
  }
}

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

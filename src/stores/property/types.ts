import type { ICategory, ITag } from '@/types/Property'

export namespace Store {
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

export enum IconType {
  ElementPlus = 1,
  Other = 0,
  None = -1
}

export type ICategory = {
  id: string
  name: string
  description: string
  tagColor: string
  icon?: string
  iconType: IconType
}

export type ITag = {
  id: string
  name: string
  description: string
  tagColor: string
  iconLink?: string
}

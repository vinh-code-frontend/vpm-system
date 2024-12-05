import type { IProject } from '@/types/Project'

export namespace Store {
  export type Name = 'project'
  export type State = {
    projects: IProject[]
  }
  export type Getter = {}
  export type Action = {}
}

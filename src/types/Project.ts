export enum ProjectStatus {
    Draft = 'Draft',
    OnGoing = 'OnGoing',
    Completed = 'Completed',
    Upgrading = 'Upgrading',
    Canceled = 'Canceled'
  }
  
  export enum Priority {
    High = 'High',
    Medium = 'Medium',
    Low = 'Low',
    None = 'None'
  }
  
  export type IProject = {
    id: string
    ownerId: string
    memberIds: string[]
    name: string
    shortcut: string
    description: string
    status: `${ProjectStatus}`
    startDate: Date
    priority: `${Priority}`
    logoUrl?: string
  }
  
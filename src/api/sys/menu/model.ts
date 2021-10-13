export interface SysMenuEntity {
  children?: Array<SysMenuEntity>
  createDate: Date
  icon: string
  id: number
  name: string
  parentName: string
  permissions: string
  pid: number
  resourceList: Array<any>
  sort: number
  type: number
  url: string
}

export interface SysMenuListParams {
  type: number
}
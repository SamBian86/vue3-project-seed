export interface SiderConfig {
  // logo图片地址
  logoUrl: string,
  // 项目名称
  appName: string,
  // 当前激活菜单的 index
  defaultActive: string
  // 当前打开的 sub-menu 的 index 的数组
  defaultOpeneds: Array<any>
  // 左侧子菜单集合数据,点击上部菜单的时候注意修改这个数组
  items: Array<any>
}

export interface AdapterConfig {
  // 是否展开状态 true展开 false收拢
  isOpen: boolean
}

export interface RefreshConfig {
  // 是否可以进行刷新操作 true可以刷新 false不可以刷新，此功能在有ajax请求的时候切换状态
  refreshPage: boolean
  // 强制刷新标识tag
  refreshByUser: boolean
}

export interface MenuConfig {
  // 原始数据
  datas: Array<any>
  // 头部菜单集合
  items: Array<any>
  // 选中项
  activeId: string
  // 选中项index
  activeIndex: number
}

export interface RoleConfig {
  name: string
}

export interface FullScreenConfig {
  status: boolean
}

export interface UserInfoConfig {
  deptId: string,
  headUrl: any,
  id: string,
  kill: number,
  mobile: string,
  password: any,
  realName: string,
  resourceList: Array<any>,
  roles: Array<any>,
  salt: string,
  superAdmin: number,
  username: string,
}

export interface LanguageConfig {
  language: string
}

export interface TabsConfig {
  // tabs集合
  items: Array<any>
  // 选中项
  activeId: string
}

export interface siteConfig {
  token: string,
  isMobile: boolean
}

export interface dictConfig {
  items: Array<any>,
  dictStore: any
}

export interface permissionConfig {
  items: Array<any>,
}

export interface routeConfig {
  // 通过菜单接口过滤出路由扁平化数据
  flatData: Array<any>,
  // 当前路由地址
  currentPath: string
}
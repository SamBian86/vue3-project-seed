import type { SiderConfig, AdapterConfig, RefreshConfig, MenuConfig, RoleConfig, FullScreenConfig, UserInfoConfig, LanguageConfig, TabsConfig } from "/#/config"
// 用于整理home页面框架的所有交互
export interface LayoutConfig {
  // 左侧导航
  sider: SiderConfig
  // 展开关闭
  adapter: AdapterConfig
  // 是否可以刷新页面
  refresh: RefreshConfig
  // 头部导航
  menu: MenuConfig
  // 租户信息
  role: RoleConfig
  // 是否全屏
  fullScreen: FullScreenConfig
  // 用户信息
  userInfo: UserInfoConfig
  // 国际化
  language: LanguageConfig
  // 标签页
  tabs: TabsConfig
}
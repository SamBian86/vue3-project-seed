
export enum WHITE_LIST {
  LOGIN = '/login'
}
export enum APP_ROUTE {
  PATH = '/'
}
export enum PAGE_NOT_FOUND {
  NAME = '404',
  TITLE = '页面不存在',
  PATH = '/404'
}
export enum PAGE_HOME {
  NAME = 'home',
  TITLE = '首页',
  PATH = '/home'
}

export enum DYNAMIC {
  NAME = 'dynamic',
  TITLE = 'dynamic',
  PATH = '/dynamic'
}

export enum LOGIN {
  NAME = 'login',
  TITLE = '登录',
  PATH = '/login'
}
// 页面
export const LOGIN_COMPONENT = () => import('/@/views/system/login/index.vue');
export const LAYOUT_COMPONENT = () => import('/@/layouts/default/index.vue');
export const HOME_COMPONENT = () => import('/@/views/pages/home/index.vue');
export const EXCEPTION_COMPONENT = () => import('/@/views/system/exception/index.vue');


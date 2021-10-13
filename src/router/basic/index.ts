import type { AppRouteRecordRaw } from '/#/router';

import {
  WHITE_LIST,
  APP_ROUTE,
  PAGE_NOT_FOUND,
  PAGE_HOME,
  DYNAMIC,
  LOGIN,
  LOGIN_COMPONENT,
  LAYOUT_COMPONENT,
  HOME_COMPONENT,
  EXCEPTION_COMPONENT
} from '/@/router/constant';

// 白名单
export const PASS_LIST = [WHITE_LIST.LOGIN]

// 登录页面
export const LOGIN_ROUTE: AppRouteRecordRaw = {
  path: LOGIN.PATH,
  name: LOGIN.NAME,
  component: LOGIN_COMPONENT,
  meta: {
    title: LOGIN.TITLE,
  }
};

// 首页
export const PAGE_HOME_ROUTE: AppRouteRecordRaw = {
  path: APP_ROUTE.PATH,
  name: PAGE_HOME.NAME,
  component: LAYOUT_COMPONENT,
  meta: {
    title: PAGE_HOME.TITLE,
  },
  children: [
    {
      path: PAGE_HOME.PATH,
      name: PAGE_HOME.NAME,
      component: HOME_COMPONENT,
      meta: {
        title: PAGE_HOME.TITLE,
      },
    },
  ],
};

// 动态路由
export const DYNAMIC_ROUTE: AppRouteRecordRaw = {
  path: DYNAMIC.PATH,
  name: DYNAMIC.NAME,
  component: LAYOUT_COMPONENT,
  meta: {
    title: DYNAMIC.TITLE,
  },
  children: [],
};

// 404页面
export const PAGE_NOT_FOUND_ROUTE: AppRouteRecordRaw = {
  path: PAGE_NOT_FOUND.PATH,
  name: PAGE_NOT_FOUND.NAME,
  component: EXCEPTION_COMPONENT,
  meta: {
    title: PAGE_NOT_FOUND.TITLE,
  }
};
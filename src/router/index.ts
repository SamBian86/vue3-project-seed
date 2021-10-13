import type { RouteRecordRaw } from 'vue-router';
import type { App } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router'
import { PASS_LIST, LOGIN_ROUTE, PAGE_HOME_ROUTE, DYNAMIC_ROUTE, PAGE_NOT_FOUND_ROUTE } from './basic'
import store from "/@/store"
import { getToken } from '/@/utils/cache/localStorage';
import { getFlatRouteData } from "/@/utils/route";
import { getNavByMenuData } from "/@/utils/layout";
const basicRoutes = [LOGIN_ROUTE, PAGE_HOME_ROUTE, DYNAMIC_ROUTE, PAGE_NOT_FOUND_ROUTE]

// app router
export const router = createRouter({
  history: createWebHashHistory(),
  routes: basicRoutes as unknown as RouteRecordRaw[],
  // strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

// 路由过滤器
router.beforeEach((to, from, next) => {
  const token = getToken()
  if (token) {
    // 有token进入login页面免登
    if (PASS_LIST.includes(to.path.toLocaleLowerCase())) {
      next()
    } else if (to.path === '/404') {
      next()
    } else if (to.path === '/' && from.path === '/') {
      next({ path: `/home` })
    } else if (to.path !== '/404' && from.path === '/') {
      // 强制刷新逻辑
      // 获取菜单
      if (store.state.route.flatData && store.state.route.flatData.length === 0) {
        store.dispatch("menu/SET_MENU_DATAS").then((response) => {
          const _response: any = getNavByMenuData(response);
          // 生成扁平化路由信息
          const flatData = getFlatRouteData(_response);
          store.dispatch("route/SET_FLATDATA", flatData);
          addRoute("dynamic", flatData);

          // 设置用户主动刷新标识
          store.dispatch("refresh/SET_REFRESH_BYUSER", true);
          next({ ...to, replace: true })
        });
      } else {
        next()
      }
    } else {
      // 用于处理非刷新跳转，头部导航及选中和左侧导航及选中
      next()
    }
  } else {
    if (PASS_LIST.includes(to.path.toLocaleLowerCase())) {
      next()
    } else {
      next({ path: `/login` }) // 否则全部重定向到登录页
    }
  }
})

// 动态添加路由
export function addRoute(parentName: string, dynamicRoutes: Array<any>) {
  dynamicRoutes.forEach(item => {
    if (item.component) {
      router.addRoute(parentName,
        {
          path: item.path,
          name: item.name,
          component: item.component,
          meta: item.meta
        }
      )
    }
  })
  // console.log('添加路由成功')
}

// config router
export function setupRouter(app: App<Element>) {
  // console.log(`router ready`)
  app.use(router);
}

export default router

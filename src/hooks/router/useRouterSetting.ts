import store from '/@/store'
import { addTab } from '/@/utils/tabs'
export default function useRouterSetting() {
  function routerPush(path: any, callback: any) {
    const ite = store.getters['route/getFlatDataByPath'](path)
    if (ite.length) {
      const path = ite[ite.length - 1]['path']
      const id = ite[ite.length - 1]['meta']['id']
      const isTab = ite[ite.length - 1]['meta']['isTab']
      // 路由跳转,从页面业务逻辑跳转
      callback && callback(path)
      // 保存当前path
      store.dispatch('route/SET_CURRENT_PATH', path)
      // 只有isTab为true才能添加
      if (isTab) {
        addTab(ite[ite.length - 1])
      }

      // 修正头部menu
      const menuItems = store.getters['menu/getMenuItems']
      const pid = ite[ite.length - 1]['meta']['pid']
      const menuIndex = menuItems.findIndex((item: any) => item.id === pid)
      store.dispatch("menu/SET_MENU_ACTIVEID", pid);
      store.dispatch("menu/SET_MENU_ACTIVEINDEX", menuIndex);

      // 重绘左侧sider的列表
      const children = menuItems[menuIndex]["children"];
      if (children.length !== 0) {
        store.dispatch("sider/SET_SIDER_ITEMS", children);
        // 设置左侧高亮
        store.dispatch('sider/SET_SIDER_DEFAULTACTIVE', id)
      }
    }
  }

  return {
    routerPush,
  }
}
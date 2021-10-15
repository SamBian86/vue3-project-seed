import store from '/@/store'
import router from "/@/router"

// 添加tab
export function addTab(item: any) {
  const items = JSON.parse(JSON.stringify(store.getters['tabs/getTabItems']))

  // 如果这个tab没有就新增
  if (!store.getters['tabs/checkTabItemById'](item.meta.id)) {
    items.push(item)
    store.dispatch('tabs/SET_TAB_ITEMS', items)
    store.dispatch('tabs/SET_TAB_ACTIVEID', item.meta.id)
  } else {
    store.dispatch('tabs/SET_TAB_ACTIVEID', item.meta.id)
  }
}

// 刷新时复原样式
export function reViewWhenRefresh(menus: Array<any>) {
  // 当前路由
  const { path } = router.currentRoute.value
  const item = store.getters['route/getFlatDataByPath'](path)
  const siderDefaultActive = item.length === 1 ? item[0]['meta']['id'] : null
  // const level = item.length === 1 ? item[0]['meta']['level'] : 0
  const siderItems = findIdMaps(menus, siderDefaultActive)
  const tabItem = store.getters['route/getFlatDataById'](siderDefaultActive)
  // 设置左侧siderItems
  store.dispatch('sider/SET_SIDER_ITEMS', siderItems)
  // 设置左侧sider defaultActive
  store.dispatch('sider/SET_SIDER_DEFAULTACTIVE', siderDefaultActive)
  // 设置头部menu高亮
  const { menuActiveId, menuActiveIndex } = getNavIdByTabId(siderDefaultActive);
  store.dispatch("menu/SET_MENU_ACTIVEID", menuActiveId);
  store.dispatch("menu/SET_MENU_ACTIVEINDEX", menuActiveIndex);

  // 设置标签页tabs items
  store.dispatch('tabs/SET_TAB_ITEMS', tabItem)
  // 设置标签页tabs ACTIVEID
  store.dispatch('tabs/SET_TAB_ACTIVEID', siderDefaultActive)

  // 保存当前path
  store.dispatch("route/SET_CURRENT_PATH", path);

  // 获取siderItems方法
  function findIdMaps(items: Array<any>, id: string) {
    let childrens: any = []
    items.forEach(item => {
      if (item['childrenIds'] && item['childrenIds'].includes(id)) {
        childrens = item['children']
      }
    })
    return childrens
  }
}

// tabId获取navid
export function getNavIdByTabId(id: any) {
  const menus = store.getters['menu/getMenuItems']
  let menuActiveId = ""
  let menuActiveIndex = 0
  menus.forEach((item: any, index: any) => {
    if (item['childrenIds'] && item['childrenIds'].includes(id)) {
      menuActiveId = item['id']
      menuActiveIndex = index
    }
  })
  return { menuActiveId, menuActiveIndex }
}

// tabId获取siderItems
export function getSiderItemsByTabId(id: any) {
  const menus = store.getters['menu/getMenuItems']
  let items: any = []
  menus.forEach((item: any) => {
    if (item['childrenIds'].includes(id)) {
      items = item['children']
    }
  })
  return items
}
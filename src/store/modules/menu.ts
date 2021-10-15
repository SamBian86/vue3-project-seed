import { setting } from "/@/settings/layoutConfig"
const { menu } = setting
import { getSysMenuNav } from "/@/api/sys/menu";
export default {
  namespaced: true,
  state: {
    ...menu
  },
  mutations: {
    SET_MENU_DATAS: (state: { datas: Array<any> }, datas: Array<any>) => {
      state.datas = datas
    },
    SET_MENU_ITEMS: (state: { items: Array<any> }, items: Array<any>) => {
      state.items = items
    },
    // 这里保存id
    SET_MENU_ACTIVEID: (state: { activeId: string }, activeId: string) => {
      state.activeId = activeId
    },
    SET_MENU_ACTIVEINDEX: (state: { activeIndex: number }, activeIndex: number) => {
      state.activeIndex = activeIndex
    },
  },
  actions: {
    // 保存原始菜单数据
    SET_MENU_DATAS({ commit }: any, state: any) {
      function deleteEmptyChildren(items: any[]) {
        items.forEach(ite => {
          if (ite.children.length === 0) {
            delete ite.children
          } else {
            deleteEmptyChildren(ite.children)
          }
        })
        return items
      }

      return new Promise((resolve, reject) => {
        getSysMenuNav()
          .then((response: any) => {
            const res = JSON.parse(JSON.stringify(response))
            deleteEmptyChildren(response)
            commit('SET_MENU_DATAS', response)
            resolve(res)
          })
          .catch((error: any) => {
            reject(error)
          })
      })
    },
    SET_MENU_ITEMS({ commit }: any, state: any) {
      commit('SET_MENU_ITEMS', state)
    },
    SET_MENU_ACTIVEID({ commit }: any, state: any) {
      commit('SET_MENU_ACTIVEID', state)
    },
    SET_MENU_ACTIVEINDEX({ commit }: any, state: any) {
      commit('SET_MENU_ACTIVEINDEX', state)
    },
  },
  getters: {
    getMenuDatas: (state: any) => {
      return state.datas
    },
    getMenuItems: (state: any) => {
      return state.items
    },
    getMenuActiveId: (state: any) => {
      return state.activeId
    },
    getMenuActiveIndex: (state: any) => {
      return state.activeIndex
    },
  }
}
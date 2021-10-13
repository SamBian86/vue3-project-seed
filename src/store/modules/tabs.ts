import { setting } from "/@/settings/layoutConfig"
const { tabs } = setting
export default {
  namespaced: true,
  state: {
    ...tabs
  },
  mutations: {
    SET_TAB_ITEMS: (state: { items: Array<any> }, items: Array<any>) => {
      state.items = items
    },
    // 这里保存id
    SET_TAB_ACTIVEID: (state: { activeId: string }, activeId: string) => {
      state.activeId = activeId
    },
  },
  actions: {
    SET_TAB_ITEMS({ commit }: any, state: any) {
      commit('SET_TAB_ITEMS', state)
    },
    SET_TAB_ACTIVEID({ commit }: any, state: any) {
      commit('SET_TAB_ACTIVEID', state)
    },
  },
  getters: {
    getTabItems: (state: any) => {
      return state.items
    },
    checkTabItemById: (state: any) => (id: number) => {
      const _item = state.items.filter((item: any) => item.meta.id === id)
      return !!_item.length
    },
    getTabItemById: (state: any) => (id: number) => {
      return state.items.find((item: any) => item.meta.id === id)
    },
    getTabActiveId: (state: any) => {
      return state.activeId
    }
  }
}
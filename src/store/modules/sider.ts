import { setting } from "/@/settings/layoutConfig"
const { sider } = setting
export default {
  namespaced: true,
  state: {
    ...sider
  },
  mutations: {
    SET_SIDER_LOGO: (state: { logoUrl: string }, logoUrl: string) => {
      state.logoUrl = logoUrl
    },
    SET_SIDER_ITEMS: (state: { items: Array<Object> }, items: Array<any>) => {
      state.items = items
    },
    SET_SIDER_APPNAME: (state: { appName: string }, appName: string) => {
      state.appName = appName
    },
    // 这里保存id
    SET_SIDER_DEFAULTACTIVE: (state: { defaultActive: string }, defaultActive: string) => {
      state.defaultActive = defaultActive
    },
    SET_SIDER_DEFAULTOPENEDS: (state: { defaultOpeneds: Array<Object> }, defaultOpeneds: Array<Object>) => {
      state.defaultOpeneds = defaultOpeneds
    },
  },
  actions: {
    SET_SIDER_LOGO({ commit }: any, state: any) {
      commit('SET_SIDER_LOGO', state)
    },
    SET_SIDER_ITEMS({ commit }: any, state: any) {
      commit('SET_SIDER_ITEMS', state)
    },
    SET_SIDER_APPNAME({ commit }: any, state: any) {
      commit('SET_SIDER_APPNAME', state)
    },
    SET_SIDER_DEFAULTACTIVE({ commit }: any, state: any) {
      commit('SET_SIDER_DEFAULTACTIVE', state)
    },
    SET_SIDER_DEFAULTOPENEDS({ commit }: any, state: any) {
      commit('SET_SIDER_DEFAULTOPENEDS', state)
    },
  },
  getters: {
    getSiderItems: (state: any) => {
      return state.items
    },
    getDefaultActive: (state: any) => {
      return state.defaultActive
    },
  }
}
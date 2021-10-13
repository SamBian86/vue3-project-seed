import { setting } from "/@/settings/routeConfig"
const { flatData, currentPath } = setting
export default {
  namespaced: true,
  state: {
    flatData,
    currentPath
  },
  mutations: {
    SET_FLATDATA: (state: { flatData: Array<any>; }, flatData: Array<any>) => {
      state.flatData = flatData
    },
    SET_CURRENT_PATH: (state: { currentPath: string; }, currentPath: string) => {
      state.currentPath = currentPath
    },
  },
  actions: {
    SET_FLATDATA({ commit }: any, state: any) {
      commit('SET_FLATDATA', state)
    },
    SET_CURRENT_PATH({ commit }: any, state: any) {
      commit('SET_CURRENT_PATH', state)
    },
  },
  getters: {
    getFlatData: (state: any) => {
      return state.flatData
    },
    getCurrentPath: (state: any) => {
      return state.currentPath
    },
    getFlatDataById: (state: { flatData: any[] }) => (id: any) => {
      return state.flatData.filter(item => item.meta.id === id)
    },
    getFlatDataByPath: (state: { flatData: any[] }) => (path: any) => {
      return state.flatData.filter(item => item.path === path)
    }
  }
}
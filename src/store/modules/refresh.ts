import { setting } from "/@/settings/layoutConfig"
const { refresh } = setting
export default {
  namespaced: true,
  state: {
    ...refresh
  },
  mutations: {
    SET_REFRESH_PAGE: (state: { refreshPage: boolean }, refreshPage: boolean) => {
      state.refreshPage = refreshPage
    },
    SET_REFRESH_BYUSER: (state: { refreshByUser: boolean }, refreshByUser: boolean) => {
      state.refreshByUser = refreshByUser
    },
  },
  actions: {
    SET_REFRESH_PAGE({ commit }: any, state: any) {
      commit('SET_REFRESH_PAGE', state)
    },
    SET_REFRESH_BYUSER({ commit }: any, state: any) {
      commit('SET_REFRESH_BYUSER', state)
    },
  },
  getters: {
    getRefreshPage: (state: any) => {
      return state.refreshPage
    },
    getRefreshByUser: (state: any) => {
      return state.refreshByUser
    },
  }
}
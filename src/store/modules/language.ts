import { setting } from "/@/settings/layoutConfig"
const { language } = setting
export default {
  namespaced: true,
  state: {
    ...language
  },
  mutations: {
    SET_LANGUAGE: (state: { language: any; }, language: Object) => {
      state.language = language
    },
  },
  actions: {
    SET_USERINFO({ commit }: any, state: any) {
      commit('SET_LANGUAGE', state)
    },
  },
  getters: {
    getLanguage: (state: any) => {
      return state.language
    },
  }
}
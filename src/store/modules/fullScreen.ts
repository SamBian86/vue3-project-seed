import { setting } from "/@/settings/layoutConfig"
const { fullScreen } = setting
export default {
  namespaced: true,
  state: {
    ...fullScreen
  },
  mutations: {
    SET_FULLSCREEN: (state: { status: boolean; }, status: boolean) => {
      state.status = status
    },
  },
  actions: {
    SET_FULLSCREEN({ commit }: any, state: any) {
      commit('SET_FULLSCREEN', state)
    },
  },
  getters: {
    getFullScreenStatus: (state: any) => {
      return state.status
    },
  }
}
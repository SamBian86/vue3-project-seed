import { setting } from "/@/settings/layoutConfig"
const { adapter } = setting
export default {
  namespaced: true,
  state: {
    ...adapter
  },
  mutations: {
    SET_ISOPEN: (state: { isOpen: boolean; }, isOpen: boolean) => {
      state.isOpen = isOpen
    },
  },
  actions: {
    SET_ISOPEN({ commit }: any, state: any) {
      commit('SET_ISOPEN', state)
    },
  },
  getters: {
    getIsOpen: (state: any) => {
      return state.isOpen
    },
  }
}
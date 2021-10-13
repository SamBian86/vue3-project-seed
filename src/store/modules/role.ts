import { setting } from "/@/settings/layoutConfig"
const { role } = setting
export default {
  namespaced: true,
  state: {
    ...role
  },
  mutations: {
    SET_ROLE: (state: { role: any; }, role: Object) => {
      state.role = role
    },
  },
  actions: {
    SET_ROLE({ commit }: any, state: any) {
      commit('SET_ROLE', state)
    },
  },
  getters: {

  }
}
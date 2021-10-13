import { setting } from "/@/settings/layoutConfig"
import { getUserInfo } from "/@/api/auth";
const { userInfo } = setting
export default {
  namespaced: true,
  state: {
    ...userInfo
  },
  mutations: {
    SET_USERINFO: (state: { userInfo: any; }, userInfo: Object) => {
      state.userInfo = userInfo
    },
  },
  actions: {
    SET_USERINFO({ commit }: any, state: any) {
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then((response: any) => {
            commit('SET_USERINFO', response)
            resolve(response)
          })
          .catch((error: any) => {
            reject(error)
          })
      })
    },
  },
  getters: {

  }
}
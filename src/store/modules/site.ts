import { setting } from "/@/settings/siteConfig"
import { login, logout } from "/@/api/auth";
import { LoginEntity } from "/@/api/auth/model";
import { router } from '/@/router'
import { setToken } from '/@/utils/cache/localStorage'

export default {
  namespaced: true,
  state: {
    ...setting
  },
  mutations: {
    LOGIN: (state: { token: any; }, token: any) => {
      state.token = token
    },
    LOGOUT: (state: { token: any; }, token: any) => {
      state.token = token
    },
    SET_ISMOBILE: (state: { isMobile: boolean; }, isMobile: boolean) => {
      state.isMobile = isMobile
    },
  },
  actions: {
    LOGIN({ commit }: any, state: LoginEntity) {
      return new Promise((resolve, reject) => {
        login(state)
          .then((response: any) => {
            const { token } = response
            router.replace({ path: "/home" });
            commit('LOGIN', token)
            resolve(response)
          })
          .catch((error: any) => {
            reject(error)
          })
      })
    },
    LOGOUT({ commit }: any, state: {}) {
      return new Promise((resolve, reject) => {
        logout()
          .then((response: any) => {
            commit('LOGOUT', '')
            setToken()
            router.replace({ name: "login" });
            resolve(response)
          })
          .catch((error: any) => {
            reject(error)
          })
      })
    },
    SET_ISMOBILE({ commit }: any, state: any) {
      commit('SET_ISMOBILE', state)
    },
  },
  getters: {
    getToken: (state: any) => {
      return state.site.token
    },
    getIsMobile: (state: any) => {
      return state.isMobile
    },
  }
}
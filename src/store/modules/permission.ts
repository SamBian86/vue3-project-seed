import { setting } from "/@/settings/permissionConfig"
const { items } = setting
import { getSysMenuPermissions } from "/@/api/sys/menu";
export default {
  namespaced: true,
  state: {
    items,
  },
  mutations: {
    SET_ITEMS: (state: { items: any; }, items: Array<any>) => {
      state.items = items
    },
  },
  actions: {
    SET_ITEMS({ commit }: any, state: any) {
      return new Promise((resolve, reject) => {
        getSysMenuPermissions()
          .then((response: any) => {
            commit('SET_ITEMS', response)
            resolve(response)
          })
          .catch((error: any) => {
            reject(error)
          })
      })
    },
  },
  getters: {
    filterPermission: (state: any) => (value: any) => {
      return state.items.findIndex((item: any) => item === value) !== -1 || false
    },
  }
}
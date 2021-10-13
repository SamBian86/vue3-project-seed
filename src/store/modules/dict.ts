import { setting } from "/@/settings/dictConfig"
const { items, dictStore } = setting
import { getSysDictTypeAll } from "/@/api/sys/dict/type";
export default {
  namespaced: true,
  state: {
    items,
    dictStore
  },
  mutations: {
    SET_ITEMS: (state: { items: any; }, items: Array<any>) => {
      state.items = items
    },
    SET_DICT_STORE: (state: { dictStore: Object; }, dictStore: Object) => {
      state.dictStore = dictStore
    },
  },
  actions: {
    SET_ITEMS({ commit }: any, state: any) {
      return new Promise((resolve, reject) => {
        getSysDictTypeAll()
          .then((response: any) => {
            commit('SET_ITEMS', response)
            resolve(response)
          })
          .catch((error: any) => {
            reject(error)
          })
      })
    },
    SET_DICT_STORE({ commit }: any, state: any) {
      commit('SET_DICT_STORE', state)
    },
  },
  getters: {
    getDictByType: (state: any) => (type: any, valueType = 'string') => {
      const items = state.dictStore[type] || []
      if (items.length === 0) {
        console.log(`请检查字典${type}配置`)
        return false
      }
      if (valueType === 'number') {
        items.forEach((item: any) => {
          if (!isNaN(parseInt(item.dictValue))) {
            item.dictValue = parseInt(item.dictValue)
          }
        })
      }
      return items
    },
    getDictNameByValue: (state: any) => (type: any, value: any) => {
      const dicts = state.dictStore[type] || []
      const items = dicts.filter((item: any) => item.dictValue === value || parseInt(item.dictValue) === value)
      return items.length === 1 ? items[0]['dictLabel'] : ''
    },
    getDictValueByName: (state: any) => (type: any, name: any) => {
      const dicts = state.dictStore[type] || []
      const items = dicts.filter((item: any) => item.dictLabel === name)
      return items.length === 1 ? items[0]['dictValue'] : ''
    }
  }
}
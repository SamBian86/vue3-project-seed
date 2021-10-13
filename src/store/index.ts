import type { App } from 'vue';
import { createStore } from 'vuex'
import site from './modules/site'
import userInfo from './modules/userInfo'
import language from './modules/language'
import fullScreen from './modules/fullScreen'
import role from './modules/role'
import refresh from './modules/refresh'
import adapter from './modules/adapter'
import sider from './modules/sider'
import menu from './modules/menu'
import tabs from './modules/tabs'
import dict from './modules/dict'
import permission from './modules/permission'
import route from './modules/route'
import { sitePlugin } from './plugins/site'

const store = createStore({
  // state?: S | (() => S);
  // getters?: GetterTree<S, S>;
  // actions?: ActionTree<S, S>;
  // mutations?: MutationTree<S>;
  modules: {
    site, userInfo, language, fullScreen, role, refresh, adapter, sider, menu, tabs, dict, permission, route
  },
  plugins: [sitePlugin],
  // strict?: boolean;
  // devtools?: boolean;
  // strict: true
})

// config router
export function setupStore(app: App<Element>) {
  // console.log(`vuex ready`)
  app.use(store);
}

export default store

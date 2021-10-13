import { setToken } from '/@/utils/cache/localStorage'

export function sitePlugin(store: any) {
  // eslint-disable-next-line no-unused-vars
  store.subscribe((mutation: { type: string }, state: { site: { token: any } }) => {
    // 登录
    if (mutation.type === 'site/LOGIN') {
      setToken(state.site.token)
    }
  })
}

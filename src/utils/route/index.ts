import { paramsToObject } from '/@/utils'

export interface YLRouteRecordRaw {
  path: string // path默认把所有-转换成/
  name: string // path默认把所有/转换成-
  componentURL: string
  component: any
  meta: YLRouteRecordRawMeta
}

export interface YLRouteRecordRawMeta {
  title: string // 中文标题
  icon: string
  level: number
  id: string
  type: number // 菜单还是按钮
  sort: number
  isTab: boolean // 是否可以形成标签页
}

export function getRouteModules() {
  const modules = import.meta.glob('../../views/**/*.vue')
  // for (const path in modules) {
  //   modules[path]().then((mod) => {
  //     console.log(path, mod)
  //   })
  // }
  // console.log('输出模块')
  return modules
}

export function getFlatRouteData(menus: Array<any>, pid = '', prevId = '') {
  const routes: any = []
  const modules = getRouteModules()
  const loopChildren = (items: any, pid: any, prevId: any) => {
    items.forEach((i: any) => {
      if (!!i.url) {
        let isLink = /http|https/.test(i.url)
        let router = {}
        if (!isLink) {
          router['path'] = '/' + i['url'].replace(/-/g, '/')
          router['name'] = i['url'].replace(/\//g, '-')
          router['componentURL'] = `../../views/pages${router['path']}/index.vue`
          router['component'] = modules[router['componentURL']]
          router['meta'] = {}
          router['meta']['title'] = i['name']
          router['meta']['icon'] = i['icon']
          router['meta']['level'] = i['level']
          router['meta']['id'] = i['id']
          router['meta']['pid'] = pid
          router['meta']['prevId'] = prevId
          router['meta']['type'] = i['type']
          router['meta']['sort'] = i['sort']
          router['meta']['action'] = 'component'
          router['meta']['isTab'] = i['children'].length === 0 ? true : false
        } else {
          const urlSplit = i.url.split('?')
          if (urlSplit.length) {
            i.url = urlSplit[0]
            const params = paramsToObject(urlSplit[1])
            router['path'] = '/' + i['url'].replace(/-/g, '/')
            router['name'] = i['url'].replace(/\//g, '-')
            router['componentURL'] = `../../views/pages${router['path']}/index.vue`
            router['component'] = modules[router['componentURL']]
            router['meta'] = {}
            router['meta']['title'] = i['name']
            router['meta']['icon'] = i['icon']
            router['meta']['level'] = i['level']
            router['meta']['id'] = i['id']
            router['meta']['pid'] = pid
            router['meta']['prevId'] = prevId
            router['meta']['type'] = i['type']
            router['meta']['sort'] = i['sort']
            router['meta']['action'] = params.action
            router['meta']['url'] = params.url
            router['meta']['isTab'] = i['children'].length === 0 ? true : false
          }
        }
        routes.push(router)
      }
      if (i.children && i.children.length !== 0) {
        // loopChildren(i.children, i.id)
        // 此处只已第一层节点的id作为后续子节点的pid
        loopChildren(i.children, i['level'] === 1 ? i.id : pid, i.id)
      }
    })
  }
  loopChildren(menus, pid, prevId)
  return routes
}

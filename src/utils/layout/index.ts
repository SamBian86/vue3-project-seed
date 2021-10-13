export interface MenuItem {
  children?: Array<any>
  icon?: string
  id?: string
  name?: string
  parentName?: string
  pid?: string
  resourceList?: Array<any>
  sort?: number
  type?: number
  level?: number
  url?: string
}

// 根据需要重新调整菜单数据结构，存入menu的items中
export function getNavByMenuData<MenuItem>(datas: Array<MenuItem>): Array<MenuItem> {
  let menus: any = []
  let level = 1
  let localhost = `${import.meta.env.VITE_APP_STATIC_URL}`
  menus = makeSomethingInMenu(datas)

  function makeSomethingInMenu(items: MenuItem[]) {
    items.forEach(item => {
      item['level'] = level

      if (/{{localhost}}/.test(item['url'])) {
        item['url'] = item['url'].replace(/{{localhost}}/, localhost)
      }

      if (item['children'] && item['children'].length !== 0) {
        // item['childrenIds'] = item.children.map(item => item.id)
        item['childrenIds'] = getChildrenIds(item.children)
        level++
        makeSomethingInMenu(item['children'])
        level--
      }
    })
    return items
  }

  function getChildrenIds(children: any, ids = []) {
    children.forEach(c => {
      if (c.children.length !== 0) {
        ids.concat(getChildrenIds(c.children, ids))
      } else {
        ids.push(c.id)
      }
    })
    return ids
  }
  // debugger
  return menus
}
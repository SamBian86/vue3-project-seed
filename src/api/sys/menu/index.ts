import { request } from "/@/utils/http/axios";
import { SysMenuEntity, SysMenuListParams } from "./model"

// 保存
// POST
// /sys/menu
export function createSysMenu(data: SysMenuEntity) {
  return request.post({
    url: `/sys/menu`,
    data
  })
}

// 修改
// PUT
// /sys/menu
export function updateSysMenu(data: SysMenuEntity) {
  return request.put({
    url: `/sys/menu`,
    data
  })
}

// 列表
// GET
// /sys/menu/list
export function getSysMenuList(params: SysMenuListParams) {
  return request.get({
    url: `/sys/menu/list`,
    params
  })
}

// 导航
// GET
// /sys/menu/nav
export function getSysMenuNav() {
  return request.get({
    url: `/sys/menu/nav`,
  })
}

// 选择菜单(添加、修改菜单)
// GET
// /sys/menu/permission/list/tree
export function getSysMenuPermissionListTree() {
  return request.get({
    url: `/sys/menu/permission/list/tree`,
  })
}


// 权限标识
// GET
// /sys/menu/permissions
export function getSysMenuPermissions() {
  return request.get({
    url: `/sys/menu/permissions`,
  })
}

// 角色菜单权限
// GET
// /sys/menu/select
export function getSysMenuSelect() {
  return request.get({
    url: `/sys/menu/select`,
  })
}

// 信息
// GET
// /sys/menu/{id}
export function getSysMenuById({ id }: any) {
  return request.get({
    url: `/sys/menu/${id}`,
  })
}

// 删除
// DELETE
// /sys/menu/{id}
export function deleteSysMenuById({ id }: any) {
  return request.delete({
    url: `/sys/menu/${id}`,
  })
}

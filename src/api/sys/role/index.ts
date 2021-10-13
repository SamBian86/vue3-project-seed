import { request } from '/@/utils/http/axios';

// 保存
// POST
// /sys/role
export function createSysRole(data: any) {
  return request.post({
    url: `/sys/role`,
    data
  })
}

// 修改
// PUT
// /sys/role
export function updateSysRole(data: any) {
  return request.put({
    url: `/sys/role`,
    data
  })
}

// 分页
// GET
// /sys/role/page
export function getSysRolePage(params: any) {
  return request.get({
    url: `/sys/role/page`,
    params
  })
}

// 列表
// GET
// /sys/role/list
export function getSysRoleList(params: any) {
  return request.get({
    url: `/sys/role/list`,
    params
  })
}

// 信息
// GET
// /sys/role/{id}
export function getSysRoleById({ roleId }: any) {
  return request.get({
    url: `/sys/role/${roleId}`,
  })
}

// 删除
// DELETE
// /sys/role/{id}
export function deleteSysRoleById({ id }: any) {
  return request.delete({
    url: `/sys/role/${id}`,
  })
}

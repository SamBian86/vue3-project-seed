import { request } from '/@/utils/http/axios';

// 保存
// POST
// /sys/dept
export function createSysDept(data: any) {
  return request.post({
    url: `/sys/dept`,
    data
  })
}

// 修改
// PUT
// /sys/dept
export function updateSysDept(data: any) {
  const { deptId } = data
  return request.put({
    url: `/sys/dept/${deptId}`,
    data
  })
}

// 分页
// GET
// /sys/dept/list
export function getSysDeptPage(params: any) {
  return request.get({
    url: `/sys/dept/list`,
    params
  })
}

// 列表
// GET
// /sys/dept/list/all
export function getSysDeptList(params: any) {
  return request.get({
    url: `/sys/dept/list/all`,
    params
  })
}

// 信息
// GET
// /sys/dept/{id}
export function getSysDeptById({ deptId }: any) {
  return request.get({
    url: `/sys/dept/${deptId}`,
  })
}

// 删除
// DELETE
// /sys/dept/{id}
export function deleteSysDeptById({ id }: any) {
  return request.delete({
    url: `/sys/dept/${id}`,
  })
}

// 树
// GET
// /sys/dept/list/tree
export function getSysDeptTree(params: any) {
  return request.get({
    url: `/sys/dept/list/tree`,
    params
  })
}

// 上级部门id
// GET
// /sys/dept/parentDeptId
export function getSysDeptParentDeptId(params: any) {
  return request.get({
    url: `/sys/dept/parentDeptId`,
    params
  })
}

// 部门下拉框list all
// GET
// /sys/dept/permission/list/all
export function getSysDeptPermissionListAll(params: any) {
  return request.get({
    url: `/sys/dept/permission/list/all`,
    params
  })
}

// 部门下拉框 tree all
// GET
// /sys/dept/permission/list/tree
export function getSysDeptPermissionListTree() {
  return request.get({
    url: `/sys/dept/permission/list/tree`
  })
}

// 部门下拉框 select
// GET
// /sys/dept/select
export function getSysDeptSelect(params: any) {
  return request.get({
    url: `/sys/dept/select`,
    params
  })
}


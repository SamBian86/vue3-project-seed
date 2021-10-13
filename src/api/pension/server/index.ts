import { request } from '/@/utils/http/axios';
// PensionServer 生活服务

// 保存
// POST
// /pension/server
export function createPensionServer(data: any) {
  return request.post({
    url: `/pension/server`,
    data
  })
}

// 修改
// PUT
// /pension/server/{id}
export function updatePensionServer(data: any) {
  const { id } = data
  return request.put({
    url: `/pension/server/${id}`,
    data
  })
}

// 分页
// GET
// /pension/server/list
export function getPensionServerPage(params: any) {
  return request.get({
    url: `/pension/server/list`,
    params
  })
}

// 查询服务select列表
// GET
// /pension/server/list/all
export function getPensionServerListAll(params: any) {
  return request.get({
    url: `/pension/server/list/all`,
    params
  })
}

// 查询分组服务列表
// GET
// /pension/server/group
export function getPensionServerGroup(params: any) {
  return request.get({
    url: `/pension/server/group`,
    params
  })
}

// 获取服务下拉列表
// GET
// /pension/server/list/pull/{id}
export function getPensionServerListPullById(params: any) {
  const { id } = params
  return request.get({
    url: `/pension/server/list/pull/${id}`,
    params
  })
}

// 查询所有服务
// GET
// /pension/server/nameList
export function getPensionServerNameList(params: any) {
  const { id } = params
  return request.get({
    url: `/pension/server/nameList`,
    params
  })
}

// 信息
// GET
// /pension/server/{id}
export function getPensionServerById({ id }: any) {
  return request.get({
    url: `/pension/server/${id}`,
  })
}

// 删除
// DELETE
// /pension/server/{id}
export function deletePensionServerById({ id }: any) {
  return request.delete({
    url: `/pension/server/${id}`,
  })
}

// 上/下架
// PUT
// /pension/server/display
export function displayPensionServer(params: any) {
  // const { id, display } = data
  return request.put({
    url: `/pension/server/display`,
    params
  })
}

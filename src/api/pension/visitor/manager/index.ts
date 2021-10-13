import { request } from '/@/utils/http/axios';
// PensionVisitorManager

// 保存
// POST
// /pension/visitor/manager
export function createPensionVisitorManager(data: any) {
  return request.post({
    url: `/pension/visitor/manager`,
    data
  })
}

// 修改
// PUT
// /pension/visitor/manager/{id}
export function updatePensionVisitorManager(data: any) {
  const { id } = data
  return request.put({
    url: `/pension/visitor/manager/${id}`,
    data
  })
}

// 分页
// GET
// /pension/visitor/manager/list
export function getPensionVisitorManagerPage(params: any) {
  return request.get({
    url: `/pension/visitor/manager/list`,
    params
  })
}

// 信息
// GET
// /pension/visitor/manager/{id}
export function getPensionVisitorManagerById({ id }: any) {
  return request.get({
    url: `/pension/visitor/manager/${id}`,
  })
}

// 删除
// DELETE
// /pension/visitor/manager/{id}
export function deletePensionVisitorManagerById({ id }: any) {
  return request.delete({
    url: `/pension/visitor/manager/${id}`,
  })
}

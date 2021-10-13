import { request } from '/@/utils/http/axios';
// PensionServerHot

// 保存
// POST
// /pension/server/hot
export function createPensionServerHot(params: any) {
  return request.post({
    url: `/pension/server/hot`,
    params
  })
}

// 修改
// PUT
// /pension/server/hot
export function updatePensionServerHot(data: any) {
  return request.put({
    url: `/pension/server/hot`,
    data
  })
}

// 分页
// GET
// /pension/server/hot/list
export function getPensionServerHotPage(params: any) {
  return request.get({
    url: `/pension/server/hot/list`,
    params
  })
}

// 删除
// DELETE
// /pension/server/hot/{id}
export function deletePensionServerHotById({ id }: any) {
  return request.delete({
    url: `/pension/server/hot/${id}`,
  })
}

// 显示次序更替
// PUT
// /pension/server/hot/{id}/exchange/{exchangeId}
export function exchangePensionServerHot(data: any) {
  const { id, exchangeId } = data
  return request.put({
    url: `/pension/server/hot/${id}/exchange/${exchangeId}`,
  })
}

import { request } from '/@/utils/http/axios';
// PensionServerscale

// 保存
// POST
// /pension/serverscale
export function createPensionServerscale(data: any) {
  return request.post({
    url: `/pension/serverscale`,
    data
  })
}

// 修改
// PUT
// /pension/serverscale/{id}
export function updatePensionServerscale(data: any) {
  const { id } = data
  return request.put({
    url: `/pension/serverscale/${id}`,
    data
  })
}

// 分页
// GET
// /pension/serverscale/list
export function getPensionServerscalePage(params: any) {
  return request.get({
    url: `/pension/serverscale/list`,
    params
  })
}

// 列表
// GET
// /pension/serverscale/list/all
export function getPensionServerscaleListAll(params: any) {
  return request.get({
    url: `/pension/serverscale/list/all`,
    params
  })
}

// 信息
// GET
// /pension/serverscale/{id}
export function getPensionServerscaleById({ id }: any) {
  return request.get({
    url: `/pension/serverscale/${id}`,
  })
}

// 删除
// DELETE
// /pension/serverscale/{id}
export function deletePensionServerscaleById({ id }: any) {
  return request.delete({
    url: `/pension/serverscale/${id}`,
  })
}

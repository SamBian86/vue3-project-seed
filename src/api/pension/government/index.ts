import { request } from '/@/utils/http/axios';
// PensionGovernment

// 保存
// POST
// /pension/government
export function createPensionGovernment(data: any) {
  return request.post({
    url: `/pension/government`,
    data
  })
}

// 修改
// PUT
// /pension/government
export function updatePensionGovernment(data: any) {
  return request.put({
    url: `/pension/government`,
    data
  })
}

// 分页
// GET
// /pension/government/list
export function getPensionGovernmentPage(params: any) {
  return request.get({
    url: `/pension/government/list`,
    params
  })
}

// 信息
// GET
// /pension/government/{id}
export function getPensionGovernmentById({ id }: any) {
  return request.get({
    url: `/pension/government/${id}`,
  })
}

// 删除
// DELETE
// /pension/government/{id}
export function deletePensionGovernmentById({ id }: any) {
  return request.delete({
    url: `/pension/government/${id}`,
  })
}

// 上/下架
// PUT
// /pension/government/display
export function displayPensionGovernment(params: any) {
  // const { id, display } = data
  return request.put({
    url: `/pension/government/display`,
    params
  })
}

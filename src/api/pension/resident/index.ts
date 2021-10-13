import { request } from '/@/utils/http/axios';
// PensionResident

// 保存
// POST
// /pension/resident
export function createPensionResident(data: any) {
  return request.post({
    url: `/pension/resident`,
    data
  })
}

// 修改
// PUT
// /pension/resident/{id}
export function updatePensionResident(data: any) {
  const { id } = data
  return request.put({
    url: `/pension/resident/${id}`,
    data
  })
}

// 分页
// GET
// /pension/resident/list
export function getPensionResidentPage(params: any) {
  return request.get({
    url: `/pension/resident/list`,
    params
  })
}

// 列表
// GET
// /pension/resident/list/all
export function getPensionResidentListAll(params: any) {
  return request.get({
    url: `/pension/resident/list/all`,
    params
  })
}

// 获取住户信息
// GET
// /pension/resident/info
export function getPensionResidentInfo(params: any) {
  return request.get({
    url: `/pension/resident/info`,
    params
  })
}

// 查询住户手机号
// GET
// /pension/resident/phonelist
export function getPensionResidentPhonelist(params: any) {
  return request.get({
    url: `/pension/resident/phonelist`,
    params
  })
}

// 信息
// GET
// /pension/resident/{id}
export function getPensionResidentById({ id }: any) {
  return request.get({
    url: `/pension/resident/${id}`,
  })
}

// 删除
// DELETE
// /pension/resident/{id}
export function deletePensionResidentById({ id }: any) {
  return request.delete({
    url: `/pension/resident/${id}`,
  })
}

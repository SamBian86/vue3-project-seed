import { request } from '/@/utils/http/axios';
// PensionResident

// 保存住户信息
// POST
// /pension/resident
export function createPensionResident(data: any) {
  return request.post({
    url: `/pension/resident`,
    data
  })
}

// 导出
// GET
// /pension/resident/export
export function exportPensionResident(params: any) {
  return request.get({
    url: `/pension/resident/export`,
    responseType: `blob`,
    params
  })
}

// 导入
// POST
// /pension/resident/import
export function importPensionResident(data: any) {
  return request.uploadFile({
    url: `/pension/resident/import`,
    data
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

// 分页
// GET
// /pension/resident/list
export function getPensionResidentPage(params: any) {
  return request.get({
    url: `/pension/resident/list`,
    params
  })
}

// 查询家庭住户列表
// GET
// /pension/resident/list/all
export function getPensionResidentListAll(params: any) {
  return request.get({
    url: `/pension/resident/list/all`,
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

// 模板下载
// GET
// /pension/resident/template/export
export function exportPensionResidentTemplate(params: any) {
  return request.get({
    url: `/pension/resident/template/export`,
    responseType: `blob`,
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

// 更新住户信息
// PUT
// /pension/resident/{id}
export function updatePensionResident(data: any) {
  const { id } = data.resident
  return request.put({
    url: `/pension/resident/${id}`,
    data
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

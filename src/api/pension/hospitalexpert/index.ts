import { request } from '/@/utils/http/axios';
// PensionHospitalexpert

// 保存
// POST
// /pension/hospitalexpert
export function createPensionHospitalexpert(data: any) {
  return request.post({
    url: `/pension/hospitalexpert`,
    data
  })
}

// 修改
// PUT
// /pension/hospitalexpert
export function updatePensionHospitalexpert(data: any) {
  const { id } = data
  return request.put({
    url: `/pension/hospitalexpert/${id}`,
    data
  })
}

// 分页
// GET
// /pension/hospitalexpert/list
export function getPensionHospitalexpertPage(params: any) {
  return request.get({
    url: `/pension/hospitalexpert/list`,
    params
  })
}

// 列表
// GET
// /pension/hospitalexpert/list/all
export function getPensionHospitalexpertListAll(params: any) {
  return request.get({
    url: `/pension/hospitalexpert/list/all`,
    params
  })
}

// 信息
// GET
// /pension/hospitalexpert/{id}
export function getPensionHospitalexpertById({ id }: any) {
  return request.get({
    url: `/pension/hospitalexpert/${id}`,
  })
}

// 删除
// DELETE
// /pension/hospitalexpert/{id}
export function deletePensionHospitalexpertById({ id }: any) {
  return request.delete({
    url: `/pension/hospitalexpert/${id}`,
  })
}

import { request } from '/@/utils/http/axios';
// HospitalInfo

// 保存
// POST
// /hospital/info
export function createHospitalInfo(data: any) {
  return request.post({
    url: `/hospital/info`,
    data
  })
}

// 修改
// PUT
// /hospital/info
export function updateHospitalInfo(data: any) {
  return request.put({
    url: `/hospital/info`,
    data
  })
}

// 添加/修改医院简介
// PUT
// /hospital/info/introduce/{id}
export function updateHospitalInfoIntroduceById(data: any) {
  const { id } = data
  return request.put({
    url: `/hospital/info/introduce/${id}`,
    data
  })
}

// 添加/修改医保定点
// PUT
// /hospital/info/medical/{id}
export function updateHospitalInfoMedicalById(data: any) {
  const { id } = data
  return request.put({
    url: `/hospital/info/medical/${id}`,
    data
  })
}

// 分页
// GET
// /hospital/info/list
export function getHospitalInfoPage(params: any) {
  return request.get({
    url: `/hospital/info/list`,
    params
  })
}

// 信息
// GET
// /hospital/info/{id}
export function getHospitalInfoById({ id }: any) {
  return request.get({
    url: `/hospital/info/${id}`,
  })
}

// 删除
// DELETE
// /hospital/info/{id}
export function deleteHospitalInfoById({ id }: any) {
  return request.delete({
    url: `/hospital/info/${id}`,
  })
}

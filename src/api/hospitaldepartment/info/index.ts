import { request } from '/@/utils/http/axios';
// HospitaldepartmentInfo

// 添加/修改科室介绍
// PUT
// /hospitaldepartment/info/introduce/{id}
export function updateHospitaldepartmentInfoIntroduceById(data: any) {
  const { id } = data
  return request.put({
    url: `/hospitaldepartment/info/introduce/${id}`,
    data
  })
}

// 保存
// POST
// /hospitaldepartment/info
export function createHospitaldepartmentInfo(data: any) {
  const { hospitalId } = data
  return request.post({
    url: `/hospitaldepartment/info/${hospitalId}`,
    data
  })
}

// 修改
// PUT
// /hospitaldepartment/info/{id}
export function updateHospitaldepartmentInfo(data: any) {
  const { id } = data
  return request.put({
    url: `/hospitaldepartment/info/${id}`,
    data
  })
}

// 分页
// GET
// /hospitaldepartment/info/{id}/list
export function getHospitaldepartmentInfoPage(params: any) {
  const { id } = params
  return request.get({
    url: `/hospitaldepartment/info/${id}/list`,
    params
  })
}

// 删除
// DELETE
// /hospitaldepartment/info/{id}
export function deleteHospitaldepartmentInfoById({ id }: any) {
  return request.delete({
    url: `/hospitaldepartment/info/${id}`,
  })
}

// 显示次序更替
// PUT
// /hospitaldepartment/info/{id}/exchange/{exchangeId}
export function exchangeHospitaldepartmentInfo(params: any) {
  const { id, exchangeId } = params
  return request.put({
    url: `/hospitaldepartment/info/${id}/exchange/${exchangeId}`,
  })
}

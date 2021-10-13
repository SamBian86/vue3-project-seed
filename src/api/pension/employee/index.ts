import { request } from '/@/utils/http/axios';

// 保存
// POST
// /pension/employee
export function createPensionEmployee(data: any) {
  return request.post({
    url: `/pension/employee`,
    data
  })
}

// 获取员工各类标签
// GET
// /pension/employee/label/{type}
export function getPensionEmployeeLabelByType(params: any) {
  const { type } = params
  return request.get({
    url: `/pension/employee/label/${type}`,
    params
  })
}

// 修改
// PUT
// /pension/employee/{id}
export function updatePensionEmployee(data: any) {
  const { id } = data
  return request.put({
    url: `/pension/employee/${id}`,
    data
  })
}

// 分页
// GET
// /pension/employee/list
export function getPensionEmployeePage(params: any) {
  return request.get({
    url: `/pension/employee/list`,
    params
  })
}

// 列表
// GET
// /pension/employee/list/all
export function getPensionEmployeeList(params: any) {
  return request.get({
    url: `/pension/employee/list/all`,
    params
  })
}

// 用户评分列表
// GET
// /pension/employee/scorelist
export function getPensionEmployeeScoreList(params: any) {
  return request.get({
    url: `/pension/employee/scorelist`,
    params
  })
}

// 派单员工列表
// GET
// /pension/employee/staff/list
export function getPensionEmployeeStaffList(params: any) {
  return request.get({
    url: `/pension/employee/staff/list`,
    params
  })
}

// 信息
// GET
// /pension/employee/{id}
export function getPensionEmployeeById({ id }: any) {
  return request.get({
    url: `/pension/employee/${id}`,
  })
}

// 删除
// DELETE
// /pension/employee/{id}
export function deletePensionEmployeeById({ id }: any) {
  return request.delete({
    url: `/pension/employee/${id}`,
  })
}

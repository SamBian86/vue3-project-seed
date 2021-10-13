import { request } from '/@/utils/http/axios';
// PensionMaintenanceapplication

// 后台补录业主报修信息
// POST
// /pension/maintenanceapplication
export function createPensionMaintenanceapplication(data: any) {
  return request.post({
    url: `/pension/maintenanceapplication`,
    data
  })
}

// 指派维修任务
// PUT
// /pension/maintenanceapplication/assign/{id}
export function assignPensionMaintenanceapplicationById(data: any) {
  const { id } = data
  return request.put({
    url: `/pension/maintenanceapplication/assign/${id}`,
    data
  })
}

// 处理维修任务
// PUT
// /pension/maintenanceapplication/complete/{id}
export function completePensionMaintenanceapplicationById(params: any) {
  const { id } = params
  return request.put({
    url: `/pension/maintenanceapplication/complete/${id}`,
    params
  })
}

// 重新指派
// PUT
// /pension/maintenanceapplication/reAssign/{id}
export function reAssignPensionMaintenanceapplicationById(params: any) {
  const { id } = params
  return request.put({
    url: `/pension/maintenanceapplication/reAssign/${id}`,
    params
  })
}

// 分页
// GET
// /pension/maintenanceapplication/list
export function getPensionMaintenanceapplicationPage(params: any) {
  return request.get({
    url: `/pension/maintenanceapplication/list`,
    params
  })
}

// 信息
// GET
// /pension/maintenanceapplication/{id}
export function getPensionMaintenanceapplicationById({ id }: any) {
  return request.get({
    url: `/pension/maintenanceapplication/${id}`,
  })
}

import { request } from '/@/utils/http/axios';
// PensionMaintenanceworker

// 保存
// POST
// /pension/maintenanceworker
export function createPensionMaintenanceworker(data: any) {
  return request.post({
    url: `/pension/maintenanceworker`,
    data
  })
}

// 修改
// PUT
// /pension/maintenanceworker/{id}
export function updatePensionMaintenanceworker(data: any) {
  const { id } = data
  return request.put({
    url: `/pension/maintenanceworker/${id}`,
    data
  })
}

// 分页
// GET
// /pension/maintenanceworker/list
export function getPensionMaintenanceworkerPage(params: any) {
  return request.get({
    url: `/pension/maintenanceworker/list`,
    params
  })
}

// 查询社区的维修人员（下拉框）
// GET
// /pension/maintenanceworker/list/{communityId}
export function getPensionMaintenanceworkerListById(params: any) {
  const { id } = params
  return request.get({
    url: `/pension/maintenanceworker/list/${id}`,
  })
}

// 信息
// GET
// /pension/maintenanceworker/{id}
export function getPensionMaintenanceworkerById({ id }: any) {
  return request.get({
    url: `/pension/maintenanceworker/${id}`,
  })
}

// 删除
// DELETE
// /pension/maintenanceworker/{id}
export function deletePensionMaintenanceworkerById({ id }: any) {
  return request.delete({
    url: `/pension/maintenanceworker/${id}`,
  })
}

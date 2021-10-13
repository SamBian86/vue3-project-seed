import { request } from '/@/utils/http/axios';
// PensionBuilding

// 保存
// POST
// /pension/building
export function createPensionBuilding(data: any) {
  return request.post({
    url: `/pension/building`,
    data
  })
}

// 修改
// PUT
// /pension/building/{id}
export function updatePensionBuilding(data: any) {
  const { id } = data
  return request.put({
    url: `/pension/building/${id}`,
    data
  })
}

// 分页
// GET
// /pension/building/list
export function getPensionBuildingPage(params: any) {
  return request.get({
    url: `/pension/building/list`,
    params
  })
}

// 列表
// GET
// /pension/building/list/all
export function getPensionBuildingListAll(params: any) {
  return request.get({
    url: `/pension/building/list/all`,
    params
  })
}

// 信息
// GET
// /pension/building/{id}
export function getPensionBuildingById({ id }: any) {
  return request.get({
    url: `/pension/building/${id}`,
  })
}

// 删除
// DELETE
// /pension/building/{id}
export function deletePensionBuildingById({ id }: any) {
  return request.delete({
    url: `/pension/building/${id}`,
  })
}

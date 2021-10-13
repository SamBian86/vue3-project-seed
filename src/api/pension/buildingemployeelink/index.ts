import { request } from '/@/utils/http/axios';
// PensionBuildingemployeelink

// 楼栋绑定管家
// POST
// /pension/buildingemployeelink
export function createPensionBuildingemployeelink(data: any) {
  return request.post({
    url: `/pension/buildingemployeelink`,
    data
  })
}

// 查询楼栋的管家集合
// GET
// /pension/buildingemployeelink/list/{buildingId}
export function getPensionBuildingemployeelinkListById({ id }: any) {
  return request.get({
    url: `/pension/buildingemployeelink/list/${id}`,
  })
}

// 楼栋解绑管家
// DELETE
// /pension/buildingemployeelink/{id}
export function deletePensionBuildingemployeelinkById({ id }: any) {
  return request.delete({
    url: `/pension/buildingemployeelink/${id}`,
  })
}

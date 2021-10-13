import { request } from '/@/utils/http/axios';
// PensionFamily

// 保存
// POST
// /pension/family
export function createPensionFamily(data: any) {
  return request.post({
    url: `/pension/family`,
    data
  })
}

// 修改
// PUT
// /pension/family/{familyId}
export function updatePensionFamily(data: any) {
  const { id } = data
  return request.put({
    url: `/pension/family/${id}`,
    data
  })
}

// 分页
// GET
// /pension/family/list
export function getPensionFamilyPage(params: any) {
  return request.get({
    url: `/pension/family/list`,
    params
  })
}

// 列表
// GET
// /pension/family/list/all
export function getPensionFamilyListAll(params: any) {
  return request.get({
    url: `/pension/family/list/all`,
    params
  })
}

// 查询住户所有家庭信息列表
// GET
// /pension/family/ownership
export function getPensionFamilyOwnership(params: any) {
  return request.get({
    url: `/pension/family/ownership`,
    params
  })
}

// 查询家庭列表(权限过滤)
// GET
// /pension/family/permission/list/all
export function getPensionFamilyPermissionListAll() {
  return request.get({
    url: `/pension/family/permission/list/all`
  })
}

// 信息
// GET
// /pension/family/{id}
export function getPensionFamilyById({ id }: any) {
  return request.get({
    url: `/pension/family/${id}`,
  })
}

// 删除
// DELETE
// /pension/family/{id}
export function deletePensionFamilyById({ id }: any) {
  return request.delete({
    url: `/pension/family/${id}`,
  })
}

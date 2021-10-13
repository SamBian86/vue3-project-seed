import { request } from '/@/utils/http/axios';
// PensionServercategory

// 保存
// POST
// /pension/servercategory
export function createPensionServercategory(data: any) {
  return request.post({
    url: `/pension/servercategory`,
    data
  })
}

// 修改
// PUT
// /pension/servercategory/{categoryId}
export function updatePensionServercategory(data: any) {
  const { id } = data
  return request.put({
    url: `/pension/servercategory/${id}`,
    data
  })
}

// 分页
// GET
// /pension/servercategory/list
export function getPensionServercategoryPage(params: any) {
  return request.get({
    url: `/pension/servercategory/list`,
    params
  })
}

// 列表
// GET
// /pension/servercategory/list/all
export function getPensionServercategoryListAll(params: any) {
  return request.get({
    url: `/pension/servercategory/list/all`,
    params
  })
}

// 信息
// GET
// /pension/servercategory/{id}
export function getPensionServercategoryById({ id }: any) {
  return request.get({
    url: `/pension/servercategory/${id}`,
  })
}

// 删除
// DELETE
// /pension/servercategory/{id}
export function deletePensionServercategoryById({ id }: any) {
  return request.delete({
    url: `/pension/servercategory/${id}`,
  })
}

// 删除多个
// DELETE
// /pension/servercategory/batch
export function deletePensionServercategoryByIds(data: any) {
  return request.delete({
    url: `/pension/servercategory/batch`,
    data
  })
}

// 上/下架
// PUT
// /pension/servercategory/display
export function displayPensionServercategory(params: any) {
  // const { id, display } = params
  return request.put({
    url: `/pension/servercategory/display`,
    params,
  })
}

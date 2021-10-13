import { request } from '/@/utils/http/axios';
// PensionServerdiscountdetail

// 保存
// POST
// /pension/serverdiscountdetail
export function createPensionServerdiscountdetail(data: any) {
  return request.post({
    url: `/pension/serverdiscountdetail`,
    data
  })
}

// 修改
// PUT
// /pension/serverdiscountdetail/{discountId}
export function updatePensionServerdiscountdetail(data: any) {
  const { id } = data
  return request.put({
    url: `/pension/serverdiscountdetail/${id}`,
    data
  })
}

// 分页
// GET
// /pension/serverdiscountdetail/list
export function getPensionServerdiscountdetailPage(params: any) {
  return request.get({
    url: `/pension/serverdiscountdetail/list`,
    params
  })
}

// 列表
// GET
// /pension/serverdiscountdetail/list/all
export function getPensionServerdiscountdetailListAll(params: any) {
  return request.get({
    url: `/pension/serverdiscountdetail/list/all`,
    params
  })
}

// 后台下单查询服务折扣
// GET
// /pension/serverdiscountdetail/order
export function getPensionServerdiscountdetailOrder(params: any) {
  return request.get({
    url: `/pension/serverdiscountdetail/order`,
    params
  })
}

// 信息
// GET
// /pension/serverdiscountdetail/{id}
export function getPensionServerdiscountdetailById({ id }: any) {
  return request.get({
    url: `/pension/serverdiscountdetail/${id}`,
  })
}

// 删除
// DELETE
// /pension/serverdiscountdetail/{id}
export function deletePensionServerdiscountdetailById({ id }: any) {
  return request.delete({
    url: `/pension/serverdiscountdetail/${id}`,
  })
}

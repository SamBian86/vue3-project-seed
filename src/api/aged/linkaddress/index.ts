import { request } from '/@/utils/http/axios';

// 保存
// POST
// /aged/linkaddress
export function createAgedLinkaddress(data: any) {
  return request.post({
    url: `/aged/linkaddress`,
    data
  })
}

// 修改
// PUT
// /aged/linkaddress/{id}
export function updateAgedLinkaddress(data: any) {
  const { id } = data
  return request.put({
    url: `/aged/linkaddress/${id}`,
    data
  })
}

// 用户服务地址分页列表
// GET
// /aged/linkaddress/list
export function getAgedLinkaddressPage(params: any) {
  return request.get({
    url: `/aged/linkaddress/list`,
    params
  })
}

// 服务地址列表查询-改为只针对前端用户
// GET
// /aged/linkaddress/delivery
export function getAgedLinkaddressDelivery(params: any) {
  return request.get({
    url: `/aged/linkaddress/delivery`,
    params
  })
}

// 信息
// GET
// /aged/linkaddress/{id}
export function getAgedLinkaddressById({ id }: any) {
  return request.get({
    url: `/aged/linkaddress/${id}`,
  })
}

// 删除
// DELETE
// /aged/linkaddress/{id}
export function deleteAgedLinkaddressById({ id }: any) {
  return request.delete({
    url: `/aged/linkaddress/${id}`,
  })
}

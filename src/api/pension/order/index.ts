import { request } from '/@/utils/http/axios';
// PensionOrder

// 保存
// POST
// /pension/order
export function createPensionOrder(data: any) {
  return request.post({
    url: `/pension/order`,
    data
  })
}

// 修改
// PUT
// /pension/order/{orderId}
export function updatePensionOrder(data: any) {
  const { id } = data
  return request.put({
    url: `/pension/order/${id}`,
    data
  })
}

// 分页
// GET
// /pension/order/list
export function getPensionOrderPage(params: any) {
  return request.get({
    url: `/pension/order/list`,
    params
  })
}

// 查询分组订单列表
// GET
// /pension/order/group
export function getPensionOrderGroup(params: any) {
  return request.get({
    url: `/pension/order/group`,
    params
  })
}

// 查询订单及其关联信息
// GET
// /pension/order/{id}
export function getPensionOrderById({ id }: any) {
  return request.get({
    url: `/pension/order/${id}`,
  })
}

// 删除
// DELETE
// /pension/order/{id}
export function deletePensionOrderById({ id }: any) {
  return request.delete({
    url: `/pension/order/${id}`,
  })
}

// 取消订单
// PUT
// /pension/order/{orderId}/cancel
export function cancelPensionOrder(params: any) {
  const { id } = params
  return request.put({
    url: `/pension/order/${id}/cancel`
  })
}

// 派单
// PUT
// /pension/order/{orderId}/dispatch/{staffId}
export function dispatchPensionOrder(params: any) {
  const { id, staffId } = params
  return request.post({
    url: `/pension/order/${id}/dispatch/${staffId}`
  })
}

// 订单核销
// PUT
// /pension/order/{orderId}/verification
export function verificationPensionOrder(params: any) {
  const { id } = params
  return request.put({
    url: `/pension/order/${id}/verification`
  })
}

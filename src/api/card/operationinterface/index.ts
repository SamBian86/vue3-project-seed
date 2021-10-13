import { request } from '/@/utils/http/axios';
// CardOperationinterface

// 保存
// POST
// /card/operationinterface
export function createCardOperationinterface(data: any) {
  return request.post({
    url: `/card/operationinterface`,
    data
  })
}

// 修改
// PUT
// /card/operationinterface/{id}
export function updateCardOperationinterface(data: any) {
  const { id } = data
  return request.put({
    url: `/card/operationinterface/${id}`,
    data
  })
}

// 分页
// GET
// /card/operationinterface/list
export function getCardOperationinterfacePage(params: any) {
  return request.get({
    url: `/card/operationinterface/list`,
    params
  })
}

// 列表
// GET
// /card/operationinterface/select
export function getCardOperationinterfaceSelect(params: any) {
  return request.get({
    url: `/card/operationinterface/select`,
    params
  })
}

// 信息
// GET
// /card/operationinterface/{id}
export function getCardOperationinterfaceById({ id }: any) {
  return request.get({
    url: `/card/operationinterface/${id}`,
  })
}

// 删除
// DELETE
// /card/operationinterface/{id}
export function deleteCardOperationinterfaceById({ id }: any) {
  return request.delete({
    url: `/card/operationinterface/${id}`,
  })
}

// 锁定/解锁业务系统
// PUT
// /card/operationinterface/{id}/{lock}
export function lockCardOperationinterface(data: any) {
  const { id, lock } = data
  return request.put({
    url: `/card/operationinterface/${id}/${lock}`,
  })
}
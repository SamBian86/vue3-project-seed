import { request } from '/@/utils/http/axios';
// CardOperationinfo

// 保存
// POST
// /card/operationinfo
export function createCardOperationinfo(data: any) {
  return request.post({
    url: `/card/operationinfo`,
    data
  })
}

// 修改
// PUT
// /card/operationinfo
export function updateCardOperationinfo(data: any) {
  const { id } = data
  return request.put({
    url: `/card/operationinfo/${id}`,
    data
  })
}

// 分页
// GET
// /card/operationinfo/list
export function getCardOperationinfoPage(params: any) {
  return request.get({
    url: `/card/operationinfo/list`,
    params
  })
}

// 列表
// GET
// /card/operationinfo/select
export function getCardOperationinfoSelect(params: any) {
  return request.get({
    url: `/card/operationinfo/select`,
    params
  })
}

// 信息
// GET
// /card/operationinfo/{id}
export function getCardOperationinfoById({ id }: any) {
  return request.get({
    url: `/card/operationinfo/${id}`,
  })
}

// 删除
// DELETE
// /card/operationinfo/{id}
export function deleteCardOperationinfoById({ id }: any) {
  return request.delete({
    url: `/card/operationinfo/${id}`,
  })
}

// 锁定/解锁业务系统
// PUT
// /card/operationinfo/{id}/{lock}
export function lockCardOperationinfo(data: any) {
  const { id, lock } = data
  return request.put({
    url: `/card/operationinfo/${id}/${lock}`,
  })
}

// 业务系统接口调用
// POST
// /card/operationinfo/{interfaceName}
export function callCardOperationinfoByInterfaceName(data: any) {
  const { interfaceName } = data
  return request.post({
    url: `/card/operationinfo/${interfaceName}`,
    data
  })
}

import { request } from '/@/utils/http/axios';
// CardOperationparameter

// 保存
// POST
// /card/operationparameter
export function createCardOperationparameter(data: any) {
  return request.post({
    url: `/card/operationparameter`,
    data
  })
}

// 修改
// PUT
// /card/operationparameter/{id}
export function updateCardOperationparameter(data: any) {
  const { id } = data
  return request.put({
    url: `/card/operationparameter/${id}`,
    data
  })
}

// 分页
// GET
// /card/operationparameter/list
export function getCardOperationparameterPage(params: any) {
  return request.get({
    url: `/card/operationparameter/list`,
    params
  })
}

// 信息
// GET
// /card/operationparameter/{id}
export function getCardOperationparameterById({ id }: any) {
  return request.get({
    url: `/card/operationparameter/${id}`,
  })
}

// 删除
// DELETE
// /card/operationparameter/{id}
export function deleteCardOperationparameterById({ id }: any) {
  return request.delete({
    url: `/card/operationparameter/${id}`,
  })
}

// 锁定/解锁业务系统
// PUT
// /card/operationparameter/{id}/{lock}
export function lockCardOperationparameter(data: any) {
  const { id, lock } = data
  return request.put({
    url: `/card/operationparameter/${id}/${lock}`,
  })
}
import { request } from '/@/utils/http/axios';
// VolunteerExchangeserver

// 保存
// POST
// /volunteer/exchangeserver
export function createVolunteerExchangeserver(data: any) {
  return request.post({
    url: `/volunteer/exchangeserver`,
    data
  })
}

// 修改
// PUT
// /volunteer/exchangeserver{id}
export function updateVolunteerExchangeserver(data: any) {
  const { id } = data
  return request.put({
    url: `/volunteer/exchangeserver/${id}`,
    data
  })
}

// 分页
// GET
// /volunteer/exchangeserver/list
export function getVolunteerExchangeserverPage(params: any) {
  return request.get({
    url: `/volunteer/exchangeserver/list`,
    params
  })
}

// 列表
// GET
// /volunteer/exchangeserver/list/all
export function getVolunteerExchangeserverListAll(params: any) {
  return request.get({
    url: `/volunteer/exchangeserver/list/all`,
    params
  })
}

// 信息
// GET
// /volunteer/exchangeserver/{id}
export function getVolunteerExchangeserverById({ id }: any) {
  return request.get({
    url: `/volunteer/exchangeserver/${id}`,
  })
}

// 删除
// DELETE
// /volunteer/exchangeserver/{id}
export function deleteVolunteerExchangeserverById({ id }: any) {
  return request.delete({
    url: `/volunteer/exchangeserver/${id}`,
  })
}

// 上/下架
// PUT
// /volunteer/exchangeserver/{id}/display/{isdisplay}
export function displayVolunteerExchangeserver(data: any) {
  const { id, isdisplay } = data
  return request.put({
    url: `/volunteer/exchangeserver/${id}/display/${isdisplay}`,
  })
}

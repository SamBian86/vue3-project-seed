import { request } from '/@/utils/http/axios';
// VolunteerExchangeproduct

// 保存
// POST
// /volunteer/exchangeproduct
export function createVolunteerExchangeproduct(data: any) {
  return request.post({
    url: `/volunteer/exchangeproduct`,
    data
  })
}

// 修改
// PUT
// /volunteer/exchangeproduct
export function updateVolunteerExchangeproduct(data: any) {
  const { id } = data
  return request.put({
    url: `/volunteer/exchangeproduct/${id}`,
    data
  })
}

// 分页
// GET
// /volunteer/exchangeproduct/list
export function getVolunteerExchangeproductPage(params: any) {
  return request.get({
    url: `/volunteer/exchangeproduct/list`,
    params
  })
}

// 列表
// GET
// /volunteer/exchangeproduct/list/all
export function getVolunteerExchangeproductListAll(params: any) {
  return request.get({
    url: `/volunteer/exchangeproduct/list/all`,
    params
  })
}

// 信息
// GET
// /volunteer/exchangeproduct/{id}
export function getVolunteerExchangeproductById({ id }: any) {
  return request.get({
    url: `/volunteer/exchangeproduct/${id}`,
  })
}

// 删除
// DELETE
// /volunteer/exchangeproduct/{id}
export function deleteVolunteerExchangeproductById({ id }: any) {
  return request.delete({
    url: `/volunteer/exchangeproduct/${id}`,
  })
}

// 上/下架
// PUT
// /volunteer/exchangeproduct/{id}/display/{isdisplay}
export function displayVolunteerExchangeproduct(data: any) {
  const { id, isdisplay } = data
  return request.put({
    url: `/volunteer/exchangeproduct/${id}/display/${isdisplay}`,
  })
}

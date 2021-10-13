import { request } from '/@/utils/http/axios';
// HouseExchangeinfo

// 保存
// POST
// /house/exchangeinfo
export function createHouseExchangeinfo(data: any) {
  return request.post({
    url: `/house/exchangeinfo`,
    data
  })
}

// 修改
// PUT
// /house/exchangeinfo/{id}
export function updateHouseExchangeinfo(data: any) {
  const { id } = data
  return request.put({
    url: `/house/exchangeinfo/${id}`,
    data
  })
}

// 发布
// PUT
// /house/exchangeinfo/publish/{id}
export function publishHouseExchangeinfo(data: any) {
  const { id } = data
  return request.put({
    url: `/house/exchangeinfo/publish/${id}`,
    data
  })
}

// 分页
// GET
// /house/exchangeinfo/list
export function getHouseExchangeinfoPage(params: any) {
  return request.get({
    url: `/house/exchangeinfo/list`,
    params
  })
}

// 信息
// GET
// /house/exchangeinfo/{id}
export function getHouseExchangeinfoById({ id }: any) {
  return request.get({
    url: `/house/exchangeinfo/${id}`,
  })
}

// 删除
// DELETE
// /house/exchangeinfo/{id}
export function deleteHouseExchangeinfoById({ id }: any) {
  return request.delete({
    url: `/house/exchangeinfo/${id}`,
  })
}

// 上/下架
// PUT
// /house/exchangeinfo/{id}/{status}
export function displayHouseExchangeinfo(data: any) {
  const { id, status } = data
  return request.put({
    url: `/house/exchangeinfo/${id}/${status}`,
  })
}

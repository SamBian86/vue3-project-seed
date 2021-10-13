import { request } from '/@/utils/http/axios';
// PensionParty

// 保存
// POST
// /pension/party
export function createPensionParty(data: any) {
  return request.post({
    url: `/pension/party`,
    data
  })
}

// 修改
// PUT
// /pension/party{id}
export function updatePensionParty(data: any) {
  const { id } = data
  return request.put({
    url: `/pension/party/${id}`,
    data
  })
}

// 分页
// GET
// /pension/party/list
export function getPensionPartyPage(params: any) {
  return request.get({
    url: `/pension/party/list`,
    params
  })
}

// 信息
// GET
// /pension/party/{id}
export function getPensionPartyById({ id }: any) {
  return request.get({
    url: `/pension/party/${id}`,
  })
}

// 删除
// DELETE
// /pension/party/{id}
export function deletePensionPartyById({ id }: any) {
  return request.delete({
    url: `/pension/party/${id}`,
  })
}

// 上/下架
// PUT
// /pension/party/display
export function displayPensionParty(params: any) {
  return request.put({
    url: `/pension/party/display`,
    params
  })
}

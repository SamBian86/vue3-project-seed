import { request } from '/@/utils/http/axios';

// 保存
// POST
// /card/info
export function createCardInfo(data: any) {
  return request.post({
    url: `/card/info`,
    data
  })
}

// 修改
// PUT
// /card/info
export function updateCardInfo(data: any) {
  return request.put({
    url: `/card/info`,
    data
  })
}

// 分页
// GET
// /card/info/list
export function getCardInfoPage(params: any) {
  return request.get({
    url: `/card/info/list`,
    params
  })
}

// 信息
// GET
// /card/info/{id}
export function getCardInfoById({ id }: any) {
  return request.get({
    url: `/card/info/${id}`,
  })
}

// 注销
// DELETE
// /card/info/{id}
export function deleteCardInfoById({ id }: any) {
  return request.delete({
    url: `/card/info/${id}`,
  })
}

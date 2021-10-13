import { request } from '/@/utils/http/axios';
// AgedActivitySign

// 分页
// GET
// /aged/activity/sign/list
export function getAgedActivitySignPage(params: any) {
  return request.get({
    url: `/aged/activity/sign/list`,
    params
  })
}

// 信息
// GET
// /aged/activity/sign/{id}
export function getAgedActivitySignById({ id }: any) {
  return request.get({
    url: `/aged/activity/sign/${id}`,
  })
}

// 删除
// DELETE
// /aged/activity/sign/{id}
export function deleteAgedActivitySignById({ id }: any) {
  return request.delete({
    url: `/aged/activity/sign/${id}`,
  })
}

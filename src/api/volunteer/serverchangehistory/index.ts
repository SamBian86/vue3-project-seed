import { request } from '/@/utils/http/axios';
// VolunteerServerchangehistory

// 保存
// POST
// /volunteer/serverchangehistory
export function createVolunteerServerchangehistory(data: any) {
  return request.post({
    url: `/volunteer/serverchangehistory`,
    data
  })
}

// 分页
// GET
// /volunteer/serverchangehistory/list
export function getVolunteerServerchangehistoryPage(params: any) {
  return request.get({
    url: `/volunteer/serverchangehistory/list`,
    params
  })
}

// 信息
// GET
// /volunteer/serverchangehistory/{id}
export function getVolunteerServerchangehistoryById({ id }: any) {
  return request.get({
    url: `/volunteer/serverchangehistory/${id}`,
  })
}

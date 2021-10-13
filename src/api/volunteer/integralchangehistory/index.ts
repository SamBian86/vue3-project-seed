import { request } from '/@/utils/http/axios';
// VolunteerIntegralchangehistory

// 保存
// POST
// /volunteer/integralchangehistory
export function createVolunteerIntegralchangehistory(data: any) {
  return request.post({
    url: `/volunteer/integralchangehistory`,
    data
  })
}

// 分页
// GET
// /volunteer/integralchangehistory/list
export function getVolunteerIntegralchangehistoryPage(params: any) {
  return request.get({
    url: `/volunteer/integralchangehistory/list`,
    params
  })
}

// 信息
// GET
// /volunteer/integralchangehistory/{id}
export function getVolunteerIntegralchangehistoryById({ id }: any) {
  return request.get({
    url: `/volunteer/integralchangehistory/${id}`,
  })
}

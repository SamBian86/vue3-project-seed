import { request } from '/@/utils/http/axios';
// PensionEpidemicsituation

// 保存
// POST
// /pension/epidemicsituation
export function createPensionEpidemicsituation(data: any) {
  return request.post({
    url: `/pension/epidemicsituation`,
    data
  })
}

// 查询最新一条记录详情
// GET
// /pension/epidemicsituation
export function getPensionEpidemicsituation() {
  return request.get({
    url: `/pension/epidemicsituation`,
  })
}

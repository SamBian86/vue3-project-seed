import { request } from '/@/utils/http/axios';
// CardRechargerecord

// 分页
// GET
// /card/rechargerecord/list
export function getCardRechargerecordPage(params: any) {
  return request.get({
    url: `/card/rechargerecord/list`,
    params
  })
}

// 信息
// GET
// /card/rechargerecord/{id}
export function getCardRechargerecordById({ id }: any) {
  return request.get({
    url: `/card/rechargerecord/${id}`,
  })
}

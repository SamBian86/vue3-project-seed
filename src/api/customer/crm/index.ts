import { request } from '/@/utils/http/axios';
// CustomerCrm

// 分页
// GET
// /customer/crm/list
export function getCustomerCrmPage(params: any) {
  return request.get({
    url: `/customer/crm/list`,
    params
  })
}

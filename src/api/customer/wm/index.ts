import { request } from '/@/utils/http/axios';
// 微盟平台客户

// 分页
// GET
// /customer/wm/list
export function getCustomerWmPage(params: any) {
  return request.get({
    url: `/customer/wm/list`,
    params
  })
}

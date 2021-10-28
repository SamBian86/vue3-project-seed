import { request } from '/@/utils/http/axios';
// CustomerInfo

// 分页
// GET
// /customer/info/list
export function getCustomerInfoPage(params: any) {
  return request.get({
    url: `/customer/info/list`,
    params
  })
}

// 信息
// GET
// /customer/info/{id}
export function getCustomerInfoById({ id }: any) {
  return request.get({
    url: `/customer/info/${id}`,
  })
}

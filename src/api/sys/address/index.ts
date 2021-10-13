import { request } from '/@/utils/http/axios';

// 查询省市区街道小区
// GET
// /sys/address
export function getSysAddress(params: any) {
  return request.get({
    url: `/sys/address`,
    params
  })
}

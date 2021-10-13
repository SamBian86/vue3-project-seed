import { request } from '/@/utils/http/axios';
// SysComplaint

// 处理
// PUT
// /sys/complaint/{id}
export function updateSysComplaint(data: any) {
  const { id } = data
  return request.put({
    url: `/sys/complaint/${id}`,
    data
  })
}

// 分页
// GET
// /sys/complaint/list
export function getSysComplaintPage(params: any) {
  return request.get({
    url: `/sys/complaint/list`,
    params
  })
}

// 处理详情
// GET
// /sys/complaint/deal/{id}
export function getSysComplaintDealById({ id }: any) {
  return request.get({
    url: `/sys/complaint/deal/${id}`,
  })
}

// 投诉详情
// GET
// /sys/complaint/complaint/{id}
export function getSysComplaintComplaintById({ id }: any) {
  return request.get({
    url: `/sys/complaint/complaint/${id}`,
  })
}

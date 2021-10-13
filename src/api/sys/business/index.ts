import { request } from '/@/utils/http/axios';
// SysBusiness

// 保存
// POST
// /sys/business
export function createSysBusiness(data: any) {
  return request.post({
    url: `/sys/business`,
    data
  })
}

// 修改
// PUT
// /sys/business
export function updateSysBusiness(data: any) {
  const { id } = data
  return request.put({
    url: `/sys/business/${id}`,
    data
  })
}

// 分页
// GET
// /sys/business/list
export function getSysBusinessPage(params: any) {
  return request.get({
    url: `/sys/business/list`,
    params
  })
}

// 列表
// GET
// /sys/business/list/all
export function getSysBusinessListAll(params: any) {
  return request.get({
    url: `/sys/business/list/all`,
    params
  })
}

// 商家下拉列表
// GET
// /sys/business/list/pull
export function getSysBusinessListPull(params: any) {
  return request.get({
    url: `/sys/business/list/pull`,
    params
  })
}

// 信息
// GET
// /sys/business/{id}
export function getSysBusinessById({ id }: any) {
  return request.get({
    url: `/sys/business/${id}`,
  })
}

// 删除
// DELETE
// /sys/business/{id}
export function deleteSysBusinessById({ id }: any) {
  return request.delete({
    url: `/sys/business/${id}`,
  })
}

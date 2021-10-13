import { request } from '/@/utils/http/axios';
// SysBusinessserverarealink

// 保存
// POST
// /sys/businessserverarealink
export function createSysBusinessserverarealink(data: any) {
  return request.post({
    url: `/sys/businessserverarealink`,
    data
  })
}

// 列表
// GET
// /sys/businessserverarealink/list/all
export function getSysBusinessserverarealinkListAll(params: any) {
  return request.get({
    url: `/sys/businessserverarealink/list/all`,
    params
  })
}

// 删除
// DELETE
// /sys/businessserverarealink/{id}
export function deleteSysBusinessserverarealinkById({ id }: any) {
  return request.delete({
    url: `/sys/businessserverarealink/${id}`,
  })
}

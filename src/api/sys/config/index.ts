import { request } from '/@/utils/http/axios';

// 保存
// POST
// /sys/config
export function createSysConfig(data: any) {
  return request.post({
    url: `/sys/config`,
    data
  })
}

// 修改
// PUT
// /sys/config
export function updateSysConfig(data: any) {
  const { id } = data
  return request.put({
    url: `/sys/config/${id}`,
    data
  })
}

// 删除
// DELETE
// /sys/config/{id}
export function deleteSysConfigById({ id }: any) {
  return request.delete({
    url: `/sys/config/${id}`,
  })
}

// 批量删除
// DELETE
// /sys/config/batch
export function deleteSysConfigBatch(data: any) {
  return request.delete({
    url: `/sys/config/batch`,
    data
  })
}

// 分页
// GET
// /sys/config/list
export function getSysConfigPage(params: any) {
  return request.get({
    url: `/sys/config/list`,
    params
  })
}

// 信息
// GET
// /sys/config/{id}
export function getSysConfigById({ id }: any) {
  return request.get({
    url: `/sys/config/${id}`,
  })
}

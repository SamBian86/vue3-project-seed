import { request } from '/@/utils/http/axios';
// SysTag

// 保存
// POST
// /sys/tag
export function createSysTag(data: any) {
  return request.post({
    url: `/sys/tag`,
    data
  })
}

// 修改
// PUT
// /sys/tag
export function updateSysTag(data: any) {
  return request.put({
    url: `/sys/tag`,
    data
  })
}

// 分页
// GET
// /sys/tag/list
export function getSysTagPage(params: any) {
  return request.get({
    url: `/sys/tag/list`,
    params
  })
}

// 列表
// GET
// /sys/tag/list/all
export function getSysTagListAll(params: any) {
  return request.get({
    url: `/sys/tag/list/all`,
    params
  })
}

// 信息
// GET
// /sys/tag/{id}
export function getSysTagById({ id }: any) {
  return request.get({
    url: `/sys/tag/${id}`,
  })
}

// 删除
// DELETE
// /sys/tag/{id}
export function deleteSysTagById({ id }: any) {
  return request.delete({
    url: `/sys/tag/${id}`,
  })
}

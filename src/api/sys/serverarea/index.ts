import { request } from '/@/utils/http/axios';

// 保存
// POST
// /sys/serverarea
export function createSysServerarea(data: any) {
  return request.post({
    url: `/sys/serverarea`,
    data
  })
}

// 修改
// PUT
// /sys/serverarea
export function updateSysServerarea(data: any) {
  const { id } = data
  return request.put({
    url: `/sys/serverarea/${id}`,
    data
  })
}

// 分页
// GET
// /sys/serverarea/list
export function getSysServerareaPage(params: any) {
  return request.get({
    url: `/sys/serverarea/list`,
    params
  })
}

// 列表
// GET
// /sys/serverarea/list/all
export function getSysServerareaList(params: any) {
  return request.get({
    url: `/sys/serverarea/list/all`,
    params
  })
}

// 下拉选择框
// GET
// /sys/serverarea/select
export function getSysServerareaSelect(params: any) {
  return request.get({
    url: `/sys/serverarea/select`,
    params
  })
}

// 信息
// GET
// /sys/serverarea/{id}
export function getSysServerareaById({ id }: any) {
  return request.get({
    url: `/sys/serverarea/${id}`,
  })
}

// 删除
// DELETE
// /sys/serverarea/{id}
export function deleteSysServerareaById({ id }: any) {
  return request.delete({
    url: `/sys/serverarea/${id}`,
  })
}

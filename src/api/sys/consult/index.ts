import { request } from '/@/utils/http/axios';
// SysConsult

// 处理
// PUT
// /sys/consult/{id}
export function updateSysConsult(data: any) {
  const { id } = data
  return request.put({
    url: `/sys/consult/${id}`,
    data
  })
}

// 分页
// GET
// /sys/consult/list
export function getSysConsultPage(params: any) {
  return request.get({
    url: `/sys/consult/list`,
    params
  })
}

// 信息
// GET
// /sys/consult/{id}
export function getSysConsultById({ id }: any) {
  return request.get({
    url: `/sys/consult/${id}`,
  })
}

// 导出
// GET
// /sys/consult/list/export
export function exportSysConsultList(params: any) {
  return request.get({
    url: `/sys/consult/list/export`,
    responseType: `blob`,
    params
  })
}

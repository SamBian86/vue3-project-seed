import { request } from '/@/utils/http/axios';
// SysDataplatform

// 保存
// POST
// /sys/dataplatform
export function createSysDataplatform(data: any) {
  return request.post({
    url: `/sys/dataplatform`,
    data
  })
}

// 修改
// PUT
// /sys/dataplatform/{id}
export function updateSysDataplatform(data: any) {
  const { id } = data
  return request.put({
    url: `/sys/dataplatform/${id}`,
    data
  })
}

// 分页
// GET
// /sys/dataplatform/list
export function getSysDataplatformPage(params: any) {
  return request.get({
    url: `/sys/dataplatform/list`,
    params
  })
}

// 信息
// GET
// /sys/dataplatform/{id}
export function getSysDataplatformById({ id }: any) {
  return request.get({
    url: `/sys/dataplatform/${id}`,
  })
}

// 删除
// DELETE
// /sys/dataplatform/{id}
export function deleteSysDataplatformById({ id }: any) {
  return request.delete({
    url: `/sys/dataplatform/${id}`,
  })
}

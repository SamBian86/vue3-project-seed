import { request } from '/@/utils/http/axios';

// 保存
// POST
// /sys/functioninfo
export function createSysFunctioninfo(data: any) {
  return request.post({
    url: `/sys/functioninfo`,
    data
  })
}

// 修改
// PUT
// /sys/functioninfo
export function updateSysFunctioninfo(data: any) {
  const { id } = data
  return request.put({
    url: `/sys/functioninfo/${id}`,
    data
  })
}

// 分页
// GET
// /sys/functioninfo/list
export function getSysFunctioninfoPage(params: any) {
  return request.get({
    url: `/sys/functioninfo/list`,
    params
  })
}

// 信息
// GET
// /sys/functioninfo/{id}
export function getSysFunctioninfoById({ id }: any) {
  return request.get({
    url: `/sys/functioninfo/${id}`,
  })
}

// 删除
// DELETE
// /sys/functioninfo/{id}
export function deleteSysFunctioninfoById({ id }: any) {
  return request.delete({
    url: `/sys/functioninfo/${id}`,
  })
}

// 上/下架
// PUT
// /sys/functioninfo/{id}/display/{isdisplay}
export function displaySysFunctioninfo(data: any) {
  const { id, isdisplay } = data
  return request.put({
    url: `/sys/functioninfo/${id}/display/${isdisplay}`,
  })
}

// 显示次序更替
// PUT
// /sys/functioninfo/{id}/exchange/{exchangeId}
export function exchangeSysFunctioninfo(data: any) {
  const { id, exchangeId } = data
  return request.put({
    url: `/sys/functioninfo/${id}/exchange/${exchangeId}`,
  })
}

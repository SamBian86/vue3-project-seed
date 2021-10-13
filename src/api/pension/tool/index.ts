import { request } from '/@/utils/http/axios';
// PensionTool

// 保存
// POST
// /pension/tool
export function createPensionTool(data: any) {
  return request.post({
    url: `/pension/tool`,
    data
  })
}

// 修改
// PUT
// /pension/tool
export function updatePensionTool(data: any) {
  return request.put({
    url: `/pension/tool`,
    data
  })
}

// 分页
// GET
// /pension/tool/list
export function getPensionToolPage(params: any) {
  return request.get({
    url: `/pension/tool/list`,
    params
  })
}

// 信息
// GET
// /pension/tool/{id}
export function getPensionToolById({ id }: any) {
  return request.get({
    url: `/pension/tool/${id}`,
  })
}

// 删除
// DELETE
// /pension/tool/{id}
export function deletePensionToolById({ id }: any) {
  return request.delete({
    url: `/pension/tool/${id}`,
  })
}

// 显示次序更替
// PUT
// /pension/tool/{id}/exchange/{exchangeId}
export function exchangePensionTool(data: any) {
  const { id, exchangeId } = data
  return request.put({
    url: `/pension/tool/${id}/exchange/${exchangeId}`,
  })
}

import { request } from '/@/utils/http/axios';
// PensionVisitrecord

// 保存
// POST
// /pension/visitrecord
export function createPensionVisitrecord(data: any) {
  return request.post({
    url: `/pension/visitrecord`,
    data
  })
}

// 修改
// PUT
// /pension/visitrecord/{id}
export function updatePensionVisitrecord(data: any) {
  const { id } = data
  return request.put({
    url: `/pension/visitrecord/${id}`,
    data
  })
}

// 分页
// GET
// /pension/visitrecord/list
export function getPensionVisitrecordPage(params: any) {
  return request.get({
    url: `/pension/visitrecord/list`,
    params
  })
}

// 列表
// GET
// /pension/visitrecord/list/all
export function getPensionVisitrecordListAll(params: any) {
  return request.get({
    url: `/pension/visitrecord/list/all`,
    params
  })
}

// 信息
// GET
// /pension/visitrecord/{id}
export function getPensionVisitrecordById({ id }: any) {
  return request.get({
    url: `/pension/visitrecord/${id}`,
  })
}

// 删除
// DELETE
// /pension/visitrecord/{id}
export function deletePensionVisitrecordById({ id }: any) {
  return request.delete({
    url: `/pension/visitrecord/${id}`,
  })
}

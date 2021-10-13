import { request } from '/@/utils/http/axios';
// AgedAgedinfo

// 保存
// POST
// /aged/agedinfo
export function createAgedAgedinfo(data: any) {
  return request.post({
    url: `/aged/agedinfo`,
    data
  })
}

// 修改
// PUT
// /aged/agedinfo/{agedId}
export function updateAgedAgedinfo(data: any) {
  const { id } = data
  return request.put({
    url: `/aged/agedinfo/${id}`,
    data
  })
}

// 用户列表 分页
// GET
// /aged/agedinfo/list
export function getAgedAgedinfoPage(params: any) {
  return request.get({
    url: `/aged/agedinfo/list`,
    params
  })
}

// 信息
// GET
// /aged/agedinfo/{id}
export function getAgedAgedinfoById({ id }: any) {
  return request.get({
    url: `/aged/agedinfo/${id}`,
  })
}

// 批量导入虚拟养老院用户信息
// GET
// /aged/agedinfo/batchImportUser
export function batchImportUserAgedAgedinfo(data: any) {
  return request.uploadFile({
    url: `/aged/agedinfo/batchImportUser`,
    data
  })
}

// 导出耘林住户信息模板
// GET
// /aged/agedinfo/exportAgedInfo
export function exportAgedAgedinfo(params: any) {
  return request.get({
    url: `/aged/agedinfo/exportAgedInfo`,
    responseType: `blob`,
    params
  })
}

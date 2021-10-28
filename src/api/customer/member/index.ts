import { request } from '/@/utils/http/axios';
// CustomerMember

// 导入
// POST
// /customer/member/import
export function batchImportCustomerMember(data: any) {
  return request.uploadFile({
    url: `/customer/member/import`,
    data
  })
}

// 分页
// GET
// /customer/member/list
export function getCustomerMemberPage(params: any) {
  return request.get({
    url: `/customer/member/list`,
    params
  })
}

// 模板下载
// GET
// /customer/member/template/export
export function exportCustomerMember(params: any) {
  return request.get({
    url: `/customer/member/template/export`,
    responseType: `blob`,
    params
  })
}

// 信息
// GET
// /customer/member/{id}
export function getCustomerMemberById({ id }: any) {
  return request.get({
    url: `/customer/member/${id}`,
  })
}

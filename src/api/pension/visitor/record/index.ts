import { request } from '/@/utils/http/axios';
// PensionVisitorRecord

// 分页
// GET
// /pension/visitor/record/list
export function getPensionVisitorRecordPage(params: any) {
  return request.get({
    url: `/pension/visitor/record/list`,
    params
  })
}

// 信息
// GET
// /pension/visitor/record/{id}
export function getPensionVisitorRecordById({ id }: any) {
  return request.get({
    url: `/pension/visitor/record/${id}`,
  })
}

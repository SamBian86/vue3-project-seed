import { request } from '/@/utils/http/axios';
// PensionVisitorScanRecord

// 分页
// GET
// /pension/visitor/scan/record/list
export function getPensionVisitorScanRecordPage(params: any) {
  return request.get({
    url: `/pension/visitor/scan/record/list`,
    params
  })
}

import { request } from '/@/utils/http/axios'
import { ContentTypeEnum } from '/@/utils/http/axios/AxiosEnum'

// 导出
// GET
// /sys/log/operation/export
export function exportSysLogOperation(params: any) {
  return request.get({
    url: `/sys/log/operation/export`,
    responseType: 'blob',
    params
  }, {
    headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED }
  })
}

// 分页
// GET
// /sys/log/operation/page
export function getSysLogOperationPage(params: any) {
  return request.get({
    url: `/sys/log/operation/page`,
    params
  })
}

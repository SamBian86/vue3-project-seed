import { request } from '/@/utils/http/axios';
import { ContentTypeEnum } from '/@/utils/http/axios/AxiosEnum'

// 分页
// GET
// /sys/log/error/page
export function getSysLogErrorPage(params: any) {
  return request.get({
    url: `/sys/log/error/page`,
    params
  }, {
    headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED }
  })
}

// 导出
// GET
// /sys/log/error/export
export function exportSysLogError(params: any) {
  return request.get({
    url: `/sys/log/error/export`,
    responseType: `blob`,
    params
  })
}
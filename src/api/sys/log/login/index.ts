import { request } from '/@/utils/http/axios'
import { ContentTypeEnum } from '/@/utils/http/axios/AxiosEnum'

// 导出
// GET
// /sys/log/login/export
export function exportSysLogLogin(params: any) {
  return request.get({
    url: `/sys/log/login/export`,
    responseType: 'blob',
    params
  }, {
    headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED }
  })
}

// 分页
// GET
// /sys/log/login/page
export function getSysLogLoginPage(params: any) {
  return request.get({
    url: `/sys/log/login/page`,
    params
  })
}
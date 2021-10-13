import { request } from '/@/utils/http/axios';

// 分页
// GET
// /job/scheduleLog/page
export function getJobScheduleLogPage(params: any) {
  return request.get({
    url: `/job/scheduleLog/page`,
    params
  })
}

// 信息
// GET
// /job/scheduleLog/{id}
export function getJobScheduleLogById({ id }: any) {
  return request.get({
    url: `/job/scheduleLog/${id}`,
  })
}

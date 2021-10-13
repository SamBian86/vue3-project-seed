import { request } from '/@/utils/http/axios';

// 保存
// POST
// /job/schedule
export function createJobSchedule(data: any) {
  return request.post({
    url: `/job/schedule`,
    data
  })
}

// 修改
// PUT
// /job/schedule
export function updateJobSchedule(data: any) {
  return request.put({
    url: `/job/schedule`,
    data
  })
}

// 分页
// GET
// /job/schedule/page
export function getJobSchedulePage(params: any) {
  return request.get({
    url: `/job/schedule/page`,
    params
  })
}

// 信息
// GET
// /job/schedule/{id}
export function getJobScheduleById({ id }: any) {
  return request.get({
    url: `/job/schedule/${id}`,
  })
}

// 删除
// DELETE
// /job/schedule
export function deleteJobScheduleById(data: any) {
  return request.delete({
    url: `/job/schedule`,
    data
  })
}

// 暂停
// PUT
// /job/schedule/pause
export function pauseJobSchedule(data: any) {
  return request.put({
    url: `/job/schedule/pause`,
    data
  })
}

// 恢复
// PUT
// /job/schedule/resume
export function resumeJobSchedule(data: any) {
  return request.put({
    url: `/job/schedule/resume`,
    data
  })
}

// 立即执行
// PUT
// /job/schedule/run
export function runJobSchedule(data: any) {
  return request.put({
    url: `/job/schedule/run`,
    data
  })
}


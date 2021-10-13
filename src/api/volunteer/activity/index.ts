import { request } from '/@/utils/http/axios';
// VolunteerActivity

// 保存
// POST
// /volunteer/activity
export function createVolunteerActivity(data: any) {
  return request.post({
    url: `/volunteer/activity`,
    data
  })
}

// 修改
// PUT
// /volunteer/activity
export function updateVolunteerActivity(data: any) {
  return request.put({
    url: `/volunteer/activity`,
    data
  })
}

// 分页
// GET
// /volunteer/activity/list
export function getVolunteerActivityPage(params: any) {
  return request.get({
    url: `/volunteer/activity/list`,
    params
  })
}

// 列表
// GET
// /volunteer/activity/list/all
export function getVolunteerActivityListAll(params: any) {
  return request.get({
    url: `/volunteer/activity/list/all`,
    params
  })
}

// 获取活动报名列表分页
// GET
// /volunteer/activity/applyList
export function getVolunteerActivityApplyList(params: any) {
  return request.post({
    url: `/volunteer/activity/applyList`,
    params
  })
}

// 添加活动回顾链接
// POST
// /volunteer/activity/review
export function reviewVolunteerActivity(params: any) {
  return request.post({
    url: `/volunteer/activity/review`,
    params
  })
}

// 信息
// GET
// /volunteer/activity/{id}
export function getVolunteerActivityById({ id }: any) {
  return request.get({
    url: `/volunteer/activity/${id}`,
  })
}

// 删除
// DELETE
// /volunteer/activity/{id}
export function deleteVolunteerActivityById({ id }: any) {
  return request.delete({
    url: `/volunteer/activity/${id}`,
  })
}

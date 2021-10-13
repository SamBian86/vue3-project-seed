import { request } from '/@/utils/http/axios';
// AgedActivity

// 保存
// POST
// /aged/activity
export function createAgedActivity(data: any) {
  return request.post({
    url: `/aged/activity`,
    data
  })
}

// 修改
// PUT
// /aged/activity/{id}
export function updateAgedActivity(data: any) {
  const { id } = data
  return request.put({
    url: `/aged/activity/${id}`,
    data
  })
}

// 分页
// GET
// /aged/activity/list
export function getAgedActivityPage(params: any) {
  return request.get({
    url: `/aged/activity/list`,
    params
  })
}

// 活动参与人员列表
// GET
// /aged/activity/{activityId}/signitem/list
export function getAgedActivitySignitem(params: any) {
  const { activityId } = params
  return request.get({
    url: `/aged/activity/${activityId}/signitem/list`,
    params
  })
}

// 信息
// GET
// /aged/activity/{id}
export function getAgedActivityById({ id }: any) {
  return request.get({
    url: `/aged/activity/${id}`,
  })
}

// 删除
// DELETE
// /aged/activity/{id}
export function deleteAgedActivityById({ id }: any) {
  return request.delete({
    url: `/aged/activity/${id}`,
  })
}

// 导出
// GET
// /aged/activity/export/list/{activityId}/{excelType}
export function exportAgedActivity(params: any) {
  const { activityId, excelType } = params
  return request.get({
    url: `/aged/activity/export/list/${activityId}/${excelType}`,
    responseType: `blob`,
    params
  })
}

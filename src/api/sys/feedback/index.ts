import { request } from '/@/utils/http/axios';
// SysFeedback

// 处理sysfeedback
// PUT
// /sys/feedback/dispose
export function updateSysFeedback(data: any) {
  return request.put({
    url: `/sys/feedback/dispose`,
    data
  })
}

// 分页
// GET
// /sys/feedback/list
export function getSysFeedbackPage(params: any) {
  return request.get({
    url: `/sys/feedback/list`,
    params
  })
}

// 信息
// GET
// /sys/feedback/{id}
export function getSysFeedbackById({ id }: any) {
  return request.get({
    url: `/sys/feedback/${id}`,
  })
}

// 删除
// DELETE
// /sys/feedback/{id}
export function deleteSysFeedbackById({ id }: any) {
  return request.delete({
    url: `/sys/feedback/${id}`,
  })
}

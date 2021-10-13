import { request } from '/@/utils/http/axios';
// PensionOwnerfeedback

// 后台补录业主反馈
// POST
// /pension/ownerfeedback
export function createPensionOwnerfeedback(data: any) {
  return request.post({
    url: `/pension/ownerfeedback`,
    data
  })
}

// 业主反馈确认
// PUT
// /pension/ownerfeedback/accept/{id}
export function acceptPensionOwnerfeedbackById(params: any) {
  const { id } = params
  return request.put({
    url: `/pension/ownerfeedback/accept/${id}`,
  })
}

// 业主反馈处理完毕
// PUT
// /pension/ownerfeedback/complete/{id}
export function completePensionOwnerfeedbackById(params: any) {
  const { id } = params
  return request.put({
    url: `/pension/ownerfeedback/complete/${id}`,
    params
  })
}

// 分页
// GET
// /pension/ownerfeedback/list
export function getPensionOwnerfeedbackPage(params: any) {
  return request.get({
    url: `/pension/ownerfeedback/list`,
    params
  })
}

// 信息
// GET
// /pension/ownerfeedback/{id}
export function getPensionOwnerfeedbackById({ id }: any) {
  return request.get({
    url: `/pension/ownerfeedback/${id}`,
  })
}

import { request } from '/@/utils/http/axios';
// VolunteerServerdurationdetail

// 保存
// POST
// /volunteer/serverdurationdetail
export function createVolunteerServerdurationdetail(data: any) {
  return request.post({
    url: `/volunteer/serverdurationdetail`,
    data
  })
}

// 修改
// PUT
// /volunteer/serverdurationdetail/{id}
export function updateVolunteerServerdurationdetail(data: any) {
  const { id } = data
  return request.put({
    url: `/volunteer/serverdurationdetail/${id}`,
    data
  })
}

// 分页
// GET
// /volunteer/serverdurationdetail/list
export function getVolunteerServerdurationdetailPage(params: any) {
  return request.get({
    url: `/volunteer/serverdurationdetail/list`,
    params
  })
}

// 列表
// GET
// /volunteer/serverdurationdetail/list/all
export function getVolunteerServerdurationdetailListAll(params: any) {
  return request.get({
    url: `/volunteer/serverdurationdetail/list/all`,
    params
  })
}

// 信息
// GET
// /volunteer/serverdurationdetail/{id}
export function getVolunteerServerdurationdetailById({ id }: any) {
  return request.get({
    url: `/volunteer/serverdurationdetail/${id}`,
  })
}

// 删除
// DELETE
// /volunteer/serverdurationdetail/{id}
export function deleteVolunteerServerdurationdetailById({ id }: any) {
  return request.delete({
    url: `/volunteer/serverdurationdetail/${id}`,
  })
}

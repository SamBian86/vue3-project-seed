import { request } from '/@/utils/http/axios';
// VolunteerInfo

// 保存
// POST
// /volunteer/info
export function createVolunteerInfo(data: any) {
  return request.post({
    url: `/volunteer/info`,
    data
  })
}

// 修改
// PUT
// /volunteer/info/{id}
export function updateVolunteerInfo(data: any) {
  const { id } = data
  return request.put({
    url: `/volunteer/info/${id}`,
    data
  })
}

// 分页
// GET
// /volunteer/info/list
export function getVolunteerInfoPage(params: any) {
  return request.get({
    url: `/volunteer/info/list`,
    params
  })
}

// 列表
// GET
// /volunteer/info/list/all
export function getVolunteerInfoListAll(params: any) {
  return request.get({
    url: `/volunteer/info/list/all`,
    params
  })
}

// 信息
// GET
// /volunteer/info/{id}
export function getVolunteerInfoById({ id }: any) {
  return request.get({
    url: `/volunteer/info/${id}`,
  })
}

// 删除
// DELETE
// /volunteer/info/{id}
export function deleteVolunteerInfoById({ id }: any) {
  return request.delete({
    url: `/volunteer/info/${id}`,
  })
}

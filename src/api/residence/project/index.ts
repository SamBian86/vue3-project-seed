import { request } from '/@/utils/http/axios';
// ResidenceProject

// 保存
// POST
// /residence/project
export function createResidenceProject(data: any) {
  return request.post({
    url: `/residence/project`,
    data
  })
}

// 修改
// PUT
// /residence/project/{id}
export function updateResidenceProject(data: any) {
  const { id } = data
  return request.put({
    url: `/residence/project/${id}`,
    data
  })
}

// 分页
// GET
// /residence/project/list
export function getResidenceProjectPage(params: any) {
  return request.get({
    url: `/residence/project/list`,
    params
  })
}

// 信息
// GET
// /residence/project/{id}
export function getResidenceProjectById({ id }: any) {
  return request.get({
    url: `/residence/project/${id}`,
  })
}

// 删除
// DELETE
// /residence/project/{id}
export function deleteResidenceProjectById({ id }: any) {
  return request.delete({
    url: `/residence/project/${id}`,
  })
}

// 上/下架
// PUT
// /residence/project/display
export function displayResidenceProject(data: any) {
  // const { id, display } = data
  return request.put({
    url: `/residence/project/display`,
    data
  })
}

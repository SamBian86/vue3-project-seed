import { request } from '/@/utils/http/axios';
// HouseReplacementinfo

// 保存
// POST
// /house/replacementinfo
export function createHouseReplacementinfo(data: any) {
  return request.post({
    url: `/house/replacementinfo`,
    data
  })
}

// 修改
// PUT
// /house/replacementinfo
export function updateHouseReplacementinfo(data: any) {
  return request.put({
    url: `/house/replacementinfo`,
    data
  })
}

// 分页
// GET
// /house/replacementinfo/list
export function getHouseReplacementinfoPage(params: any) {
  return request.get({
    url: `/house/replacementinfo/list`,
    params
  })
}

// 获取所有未绑定社区
// GET
// /house/replacementinfo/communities
export function getHouseReplacementinfoCommunitiesPage(params: any) {
  return request.get({
    url: `/house/replacementinfo/communities`,
    params
  })
}

// 列表
// GET
// /house/replacementinfo/list/all
export function getHouseReplacementinfoListAll(params: any) {
  return request.get({
    url: `/house/replacementinfo/list/all`,
    params
  })
}

// 信息
// GET
// /house/replacementinfo/{id}
export function getHouseReplacementinfoById({ id }: any) {
  return request.get({
    url: `/house/replacementinfo/${id}`,
  })
}

// 删除
// DELETE
// /house/replacementinfo/{id}
export function deleteHouseReplacementinfoById({ id }: any) {
  return request.delete({
    url: `/house/replacementinfo/${id}`,
  })
}

// 社区解绑
// DELETE
// /house/replacementinfo/unbound/{id}
export function unboundHouseReplacementinfoById(params: any) {
  const { id } = params
  return request.delete({
    url: `/house/replacementinfo/unbound/${id}`,
  })
}

// 绑定社区
// POST
// /house/replacementinfo/{id}/bound
export function boundHouseReplacementinfoById(data: any) {
  const { id } = data
  return request.post({
    url: `/house/replacementinfo/${id}/bound`,
    data: [data]
  })
}

// 获取当前租售中心绑定社区列表
// GET
// /house/replacementinfo/{id}/communities
export function getHouseReplacementinfoCommunitiesById(params: any) {
  const { id } = params
  return request.get({
    url: `/house/replacementinfo/${id}/communities`,
  })
}


import { request } from '/@/utils/http/axios';
// SysCommunity

// 保存
// POST
// /sys/community
export function createSysCommunity(data: any) {
  return request.post({
    url: `/sys/community`,
    data
  })
}

// 修改
// PUT
// /sys/community/{id}
export function updateSysCommunity(data: any) {
  const { id } = data
  return request.put({
    url: `/sys/community/${id}`,
    data
  })
}

// 分页
// GET
// /sys/community/list
export function getSysCommunityPage(params: any) {
  return request.get({
    url: `/sys/community/list`,
    params
  })
}

// 列表
// GET
// /sys/community/list/all
export function getSysCommunityListAll(params: any) {
  return request.get({
    url: `/sys/community/list/all`,
    params
  })
}

// 信息
// GET
// /sys/community/{id}
export function getSysCommunityById({ id }: any) {
  return request.get({
    url: `/sys/community/${id}`,
  })
}

// 删除
// DELETE
// /sys/community/{id}
export function deleteSysCommunityById({ id }: any) {
  return request.delete({
    url: `/sys/community/${id}`,
  })
}

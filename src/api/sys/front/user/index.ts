import { request } from '/@/utils/http/axios';

// 标记前端用户
// PUT
// /sys/front/user/bin/tag
export function tagSysFrontUserBin(data: any) {
  return request.put({
    url: `/sys/front/user/bin/tag`,
    data
  })
}

// 分页
// GET
// /sys/front/user/page
export function getSysFrontUserPage(params: any) {
  return request.get({
    url: `/sys/front/user/page`,
    params
  })
}

// 查询用户手机号
// GET
// /sys/front/user/phonelist
export function getSysFrontUserPhonelist(params: any) {
  return request.get({
    url: `/sys/front/user/phonelist`,
    params
  })
}

// 信息
// GET
// /sys/front/user/{id}
export function getSysFrontUserById({ id }: any) {
  return request.get({
    url: `/sys/front/user/${id}`,
  })
}

// 修改状态
// PUT
// /sys/front/user/{id}/status/{status}
export function displaySysFrontUser(data: any) {
  const { id, status } = data
  return request.put({
    url: `/sys/front/user/${id}/status/${status}`,
  })
}

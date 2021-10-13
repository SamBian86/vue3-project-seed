import { request } from '/@/utils/http/axios';

// 获取登录的用户信息
// GET
// /sys/user
export function getSysUser(params: any) {
  return request.get({
    url: `/sys/user`,
    params
  })
}

// 保存
// POST
// /sys/user
export function createSysUser(data: any) {
  return request.post({
    url: `/sys/user`,
    data
  })
}

// 修改
// PUT
// /sys/user
export function updateSysUser(data: any) {
  const { userId } = data
  return request.put({
    url: `/sys/user/${userId}`,
    data
  })
}

// 分页 后台用户列表
// GET
// /sys/user/list
export function getSysUserPage(params: any) {
  return request.get({
    url: `/sys/user/list`,
    params
  })
}

// 用户信息
// GET
// /sys/user/{id}
export function getSysUserById({ id }: any) {
  return request.get({
    url: `/sys/user/${id}`,
  })
}

// 删除
// DELETE
// /sys/user/{id}
export function deleteSysUserById({ id }: any) {
  return request.delete({
    url: `/sys/user/${id}`,
  })
}

// 查询派单员工
// GET
// /sys/user/order/{phoneNumber}
export function getSysUserOrderByPhoneNumber(params: any) {
  const { phoneNumber } = params
  return request.get({
    url: `/sys/user/order/${phoneNumber}`,
    params
  })
}

// 修改密码
// POST
// /sys/user/password
export function updateSysUserPassword(data: any) {
  return request.post({
    url: `/sys/user/password`,
    data
  })
}

// 查询用户手机号
// GET
// /sys/user/phonelist
export function getSysUserPhoneList(params: any) {
  return request.get({
    url: `/sys/user/phonelist`,
    params
  })
}


import { request } from "/@/utils/http/axios";
import { LoginEntity, ModifyPasswordEntity } from "./model"
import { ContentTypeEnum } from "/@/utils/http/axios/AxiosEnum"
// 验证码
// GET
// /auth/captcha

// 登录
// POST
// /auth/login
export function login<T>(data: LoginEntity, options = { }): Promise<T> {
  return request.post({
    url: '/auth/login',
    data
  }, options = { })
}
// 退出
// POST
// /auth/logout
export function logout() {
  return request.post({
    url: '/auth/logout',
  }, {
    headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED }
  })
}

// 修改密码
// PUT
// /auth/modify/password
export function modifyPassword(data: ModifyPasswordEntity) {
  return request.put({
    url: '/auth/modify/password',
    data
  })
}

// 登录用户信息
// GET
// /auth/user/info
export function getUserInfo() {
  return request.get({
    url: '/auth/user/info'
  })
}
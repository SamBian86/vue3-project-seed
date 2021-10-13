// 登录数据模型
export interface LoginEntity {
  captcha: string,
  password: string,
  username: string,
  uuid: string,
}

// 修改数据模型
export interface ModifyPasswordEntity {
  newPassword: string,
  password: string,
}
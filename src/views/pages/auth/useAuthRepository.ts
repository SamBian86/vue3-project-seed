import { ref } from 'vue';
import {
  login,
  logout,
  modifyPassword,
  getUserInfo,
} from '/@/api/auth';

export default function useAuthRepository() {
  const formData = ref({})
  // 重置表单
  const formPageResetHandle = (callback: any) => {
    callback && callback()
  }

  // 登录
  const loginHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      login(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 退出
  const logoutHandle = () => {
    return new Promise((resolve, reject) => {
      logout().then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 修改
  const modifyPasswordHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      modifyPassword(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 获取列表数据
  const getUserInfoHandle = () => {
    return new Promise((resolve, reject) => {
      getUserInfo().then((response: any) => {
        resolve(response)
      });
    })
  }

  return {
    formData,
    loginHandle,
    logoutHandle,
    modifyPasswordHandle,
    getUserInfoHandle,
  }
}


import { ref } from 'vue';
import {
  createVolunteerIntegralchangehistory,
  getVolunteerIntegralchangehistoryPage,
  getVolunteerIntegralchangehistoryById,
} from '/@/api/volunteer/integralchangehistory';

export default function useVolunteerIntegralchangehistoryRepository() {
  const formData = ref({})

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 创建
  const createVolunteerIntegralchangehistoryHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      createVolunteerIntegralchangehistory(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getVolunteerIntegralchangehistoryPage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 根据id获取数据
  const getVolunteerIntegralchangehistoryByIdHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      getVolunteerIntegralchangehistoryById(params).then((response: any) => {
        formData.value = response
        callback && callback()
        resolve(response)
      });
    })
  }

  return {
    formData,
    formPageResetHandle,
    createVolunteerIntegralchangehistoryHandle,
    getPageHandle,
    getVolunteerIntegralchangehistoryByIdHandle,
  }
}


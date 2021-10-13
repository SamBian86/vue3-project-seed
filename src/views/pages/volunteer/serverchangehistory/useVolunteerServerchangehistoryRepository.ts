import { ref } from 'vue';
import {
  createVolunteerServerchangehistory,
  getVolunteerServerchangehistoryPage,
  getVolunteerServerchangehistoryById,
} from '/@/api/volunteer/serverchangehistory';

export default function useVolunteerServerchangehistoryRepository() {
  const formData = ref({})

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 创建
  const createVolunteerServerchangehistoryHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      createVolunteerServerchangehistory(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getVolunteerServerchangehistoryPage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 根据id获取数据
  const getVolunteerServerchangehistoryByIdHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      getVolunteerServerchangehistoryById(params).then((response: any) => {
        formData.value = response
        callback && callback()
        resolve(response)
      });
    })
  }

  return {
    formData,
    formPageResetHandle,
    createVolunteerServerchangehistoryHandle,
    getPageHandle,
    getVolunteerServerchangehistoryByIdHandle,
  }
}


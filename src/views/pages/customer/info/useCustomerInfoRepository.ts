import { ref } from 'vue';
import {
  getCustomerInfoPage,
  getCustomerInfoById,
} from '/@/api/customer/info';

export default function useCustomerInfoRepository() {
  const formData = ref({})

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getCustomerInfoPage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 根据id获取数据
  const getCustomerInfoByIdHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      getCustomerInfoById(params).then((response: any) => {
        formData.value = response
        callback && callback()
        resolve(response)
      });
    })
  }

  return {
    formData,
    formPageResetHandle,
    getPageHandle,
    getCustomerInfoByIdHandle,
  }
}


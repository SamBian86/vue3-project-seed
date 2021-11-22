import { ref } from 'vue';
import {
  getCustomerWmPage
} from '/@/api/customer/wm';

export default function useCustomerWmRepository() {
  const formData = ref({})

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getCustomerWmPage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  return {
    formData,
    formPageResetHandle,
    getPageHandle,
  }
}


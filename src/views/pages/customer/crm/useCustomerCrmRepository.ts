import { ref } from 'vue';
import {
  getCustomerCrmPage,
} from '/@/api/customer/crm';

export default function useCustomerCrmRepository() {
  const formData = ref({})

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getCustomerCrmPage(params).then((response: any) => {
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


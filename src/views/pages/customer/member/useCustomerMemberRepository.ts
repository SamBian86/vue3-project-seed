import { ref } from 'vue';
import {
  getCustomerMemberPage,
  exportCustomerMember,
  getCustomerMemberById,
  batchImportCustomerMember,
} from '/@/api/customer/member';

export default function useCustomerMemberRepository() {
  const formData = ref({})

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getCustomerMemberPage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 导出
  const exportHandle = (params: any) => {
    exportCustomerMember(params)
  }

  // 根据id获取数据
  const getCustomerMemberByIdHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      getCustomerMemberById(params).then((response: any) => {
        formData.value = response
        callback && callback()
        resolve(response)
      });
    })
  }

  // 导入
  const batchImportCustomerMemberHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      batchImportCustomerMember(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  return {
    formData,
    formPageResetHandle,
    getPageHandle,
    exportHandle,
    getCustomerMemberByIdHandle,
    batchImportCustomerMemberHandle
  }
}


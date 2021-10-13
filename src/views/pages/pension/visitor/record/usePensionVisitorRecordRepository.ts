import { ref } from 'vue';
import {
  getPensionVisitorRecordPage,
  getPensionVisitorRecordById,
} from '/@/api/pension/visitor/record';

export default function usePensionVisitorRecordRepository() {
  const formData = ref({})

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getPensionVisitorRecordPage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 根据id获取数据
  const getPensionVisitorRecordByIdHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      getPensionVisitorRecordById(params).then((response: any) => {
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
    getPensionVisitorRecordByIdHandle,
  }
}


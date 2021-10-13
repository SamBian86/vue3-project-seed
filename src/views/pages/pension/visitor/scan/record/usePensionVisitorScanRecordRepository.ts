import { ref } from 'vue';
import {
  getPensionVisitorScanRecordPage,
} from '/@/api/pension/visitor/scan/record';

export default function usePensionVisitorScanRecordRepository() {
  const formData = ref({})

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getPensionVisitorScanRecordPage(params).then((response: any) => {
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


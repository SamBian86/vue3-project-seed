import { ref } from 'vue';
import {
  updatePensionServerSequence,
  getPensionServerSequencePage,
} from '/@/api/pension/server/sequence';

export default function usePensionServerSequenceRepository() {
  const formData = ref({})

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 修改
  const updatePensionServerSequenceHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      updatePensionServerSequence(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getPensionServerSequencePage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  return {
    formData,
    formPageResetHandle,
    updatePensionServerSequenceHandle,
    getPageHandle,
  }
}


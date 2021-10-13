import { ref } from 'vue';
import {
  createPensionEpidemicsituation,
  getPensionEpidemicsituation,
} from '/@/api/pension/epidemicsituation';

export default function usePensionEpidemicsituationRepository() {
  const formData = ref({})

  // 创建
  const createPensionEpidemicsituationHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      createPensionEpidemicsituation(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 查询最新一条记录详情
  const getPensionEpidemicsituationByIdHandle = (callback: any) => {
    return new Promise((resolve, reject) => {
      getPensionEpidemicsituation().then((response: any) => {
        formData.value = response
        callback && callback()
        resolve(response)
      });
    })
  }

  return {
    formData,
    createPensionEpidemicsituationHandle,
    getPensionEpidemicsituationByIdHandle,
  }
}


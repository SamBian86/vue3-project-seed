import { ref } from 'vue';
import {
  getHospitalExaminationPage,
  getHospitalExaminationById,
} from '/@/api/hospital/examination';

export default function useHospitalExaminationRepository() {
  const formData = ref({})

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getHospitalExaminationPage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 根据id获取数据
  const getHospitalExaminationByIdHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      getHospitalExaminationById(params).then((response: any) => {
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
    getHospitalExaminationByIdHandle,
  }
}


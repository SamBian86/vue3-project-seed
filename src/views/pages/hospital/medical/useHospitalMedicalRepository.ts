import { ref } from 'vue';
import {
  getHospitalMedicalPage,
  getDischargeHospitalMedicalById,
  getHistoryHospitalMedicalById,
  getSurveyHospitalMedicalById,
  getInspectHospitalMedicalById,
} from '/@/api/hospital/medical';

export default function useHospitalMedicalRepository() {
  const formData = ref({})
  const dischargeHospitalMedical = ref({})
  const historyHospitalMedical = ref({})
  const surveyHospitalMedical = ref({})
  const inspectHospitalMedical = ref({})

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getHospitalMedicalPage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 获取住院记录详情（type=1）
  const getDischargeHospitalMedicalByIdHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      getDischargeHospitalMedicalById(params).then((response: any) => {
        dischargeHospitalMedical.value = response
        resolve(response)
      });
    })
  }

  // 获取门诊病历详情（type=2）
  const getHistoryHospitalMedicalByIdHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      getHistoryHospitalMedicalById(params).then((response: any) => {
        historyHospitalMedical.value = response
        resolve(response)
      });
    })
  }

  // 获取检验详情（type=3）
  const getSurveyHospitalMedicalByIdHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      getSurveyHospitalMedicalById(params).then((response: any) => {
        surveyHospitalMedical.value = response
        resolve(response)
      });
    })
  }

  //  获取检查详情（type=4）
  const getInspectHospitalMedicalByIdHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      getInspectHospitalMedicalById(params).then((response: any) => {
        inspectHospitalMedical.value = response
        resolve(response)
      });
    })
  }


  return {
    formData,
    formPageResetHandle,
    getPageHandle,
    dischargeHospitalMedical,
    getDischargeHospitalMedicalByIdHandle,
    historyHospitalMedical,
    getHistoryHospitalMedicalByIdHandle,
    surveyHospitalMedical,
    getSurveyHospitalMedicalByIdHandle,
    inspectHospitalMedical,
    getInspectHospitalMedicalByIdHandle,
  }
}


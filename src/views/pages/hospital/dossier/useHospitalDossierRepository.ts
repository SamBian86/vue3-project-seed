import {
  getHospitalDossierPage,
  getHospitalDossierPatientPage,
} from '/@/api/hospital/dossier';

export default function useHospitalDossierRepository() {

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    callback && callback()
  }

  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getHospitalDossierPage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 健康管理-用户管理列表
  const getHospitalDossierPatientPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getHospitalDossierPatientPage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  return {
    formPageResetHandle,
    getPageHandle,
    getHospitalDossierPatientPageHandle,
  }
}


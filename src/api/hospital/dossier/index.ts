import { request } from '/@/utils/http/axios';
// HospitalDossier

// 分页
// GET
// /hospital/dossier/list
export function getHospitalDossierPage(params: any) {
  return request.get({
    url: `/hospital/dossier/list`,
    params
  })
}

// 健康管理-用户管理列表
// GET
// /hospital/dossier/patient/list
export function getHospitalDossierPatientPage(params: any) {
  return request.get({
    url: `/hospital/dossier/patient/list`,
    params
  })
}

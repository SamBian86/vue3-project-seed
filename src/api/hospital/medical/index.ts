import { request } from '/@/utils/http/axios';
// HospitalMedical

// 分页
// GET
// /hospital/medical/list
export function getHospitalMedicalPage(params: any) {
  return request.get({
    url: `/hospital/medical/list`,
    params
  })
}

// 获取住院记录详情（type=1）
// GET
// /hospital/medical/discharge/{id}
export function getDischargeHospitalMedicalById({ id }: any) {
  return request.get({
    url: `/hospital/medical/discharge/${id}`,
  })
}

// 获取门诊病历详情（type=2）
// GET
// /hospital/medical/history/{id}
export function getHistoryHospitalMedicalById({ id }: any) {
  return request.get({
    url: `/hospital/medical/history/${id}`,
  })
}


// 获取检验详情（type=3）
// GET
// /hospital/medical/survey/{id}
export function getSurveyHospitalMedicalById({ id }: any) {
  return request.get({
    url: `/hospital/medical/survey/${id}`,
  })
}


// 获取检查详情（type=4）
// GET
// /hospital/medical/inspect/{id}
export function getInspectHospitalMedicalById({ id }: any) {
  return request.get({
    url: `/hospital/medical/inspect/${id}`,
  })
}


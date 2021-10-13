import { request } from '/@/utils/http/axios';
// HospitalExamination

// 分页
// GET
// /hospital/examination/list
export function getHospitalExaminationPage(params: any) {
  return request.get({
    url: `/hospital/examination/list`,
    params
  })
}

// 信息
// GET
// /hospital/examination/{id}
export function getHospitalExaminationById({ id }: any) {
  return request.get({
    url: `/hospital/examination/${id}`,
  })
}

import { request } from '/@/utils/http/axios';
// HospitalRegister

// 分页
// GET
// /hospital/register/list
export function getHospitalRegisterPage(params: any) {
  return request.get({
    url: `/hospital/register/list`,
    params
  })
}

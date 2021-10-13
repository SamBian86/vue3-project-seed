import { request } from '/@/utils/http/axios';
// HospitalZoneInfo

// 新增、修改环境展示图片
// PUT
// /hospitalZone/info/photo/{id}
export function updateHospitalZoneInfoPhoto(data: any) {
  const { id, ossEntityList } = data
  return request.put({
    url: `/hospitalZone/info/photo/${id}`,
    data: ossEntityList
  })
}

// 保存
// POST
// /hospitalZone/info
export function createHospitalZoneInfo(data: any) {
  const { hospitalId } = data
  return request.post({
    url: `/hospitalZone/info/${hospitalId}`,
    data
  })
}

// 修改
// PUT
// /hospitalZone/info
export function updateHospitalZoneInfo(data: any) {
  const { id } = data
  return request.put({
    url: `/hospitalZone/info/${id}`,
    data
  })
}

// 医院环境列表
// GET
// /hospitalZone/info/{id}/list
export function getHospitalZoneInfoPage(params: any) {
  const { id } = params
  return request.get({
    url: `/hospitalZone/info/${id}/list`,
    params
  })
}

// 删除
// DELETE
// /hospitalZone/info/{id}
export function deleteHospitalZoneInfoById({ id }: any) {
  return request.delete({
    url: `/hospitalZone/info/${id}`,
  })
}

// 显示次序更替
// PUT
// /hospitalZone/info/{id}/exchange/{exchangeId}
export function exchangeHospitalZoneInfo(data: any) {
  const { id, exchangeId } = data
  return request.put({
    url: `/hospitalZone/info/${id}/exchange/${exchangeId}`,
  })
}

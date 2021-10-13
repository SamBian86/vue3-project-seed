import { request } from '/@/utils/http/axios';
import { ContentTypeEnum } from "/@/utils/http/axios/AxiosEnum"

// 保存
// POST
// /sys/bannerinfo
export function createSysBannerinfo(data: any) {
  return request.post({
    url: `/sys/bannerinfo`,
    data
  })
}

// 分页
// GET
// /sys/bannerinfo/list
export function getSysBannerinfoPage(params: any) {
  return request.get({
    url: `/sys/bannerinfo/list`,
    params
  })
}

// 修改
// PUT
// /sys/bannerinfo
export function updateSysBannerinfo(data: any) {
  const { id } = data
  return request.put({
    url: `/sys/bannerinfo/${id}`,
    data
  })
}

// 信息
// GET
// /sys/bannerinfo/{id}
export function getSysBannerinfoById({ id }: any) {
  return request.get({
    url: `/sys/bannerinfo/${id}`,
  })
}

// 删除
// DELETE
// /sys/bannerinfo/{id}
export function deleteSysBannerinfoById({ id }: any) {
  return request.delete({
    url: `/sys/bannerinfo/${id}`,
  })
}

// 查询关联内容列表信息
// GET
// /sys/bannerinfo/operation
export function getSysBannerinfoOperation(params: any) {
  return request.get({
    url: `/sys/bannerinfo/operation`,
    params
  })
}

// 查询内容所属区域
// GET
// /sys/bannerinfo/operation/serverarea
export function getSysBannerinfoOperationServerarea(params: any) {
  return request.get({
    url: `/sys/bannerinfo/operation/serverarea`,
    params
  })
}

// 上/下架
// PUT
// /sys/bannerinfo/{id}/display/{isdisplay}
export function displaySysBannerinfo(data: any) {
  const { id, isdisplay } = data
  return request.put({
    url: `/sys/bannerinfo/${id}/display/${isdisplay}`,
  })
}

// 显示次序更替
// PUT
// /sys/bannerinfo/{id}/exchange/{exchangeId}
export function exchangeSysBannerinfo(data: any) {
  const { id, exchangeId } = data
  return request.put({
    url: `/sys/bannerinfo/${id}/exchange/${exchangeId}`,
  })
}


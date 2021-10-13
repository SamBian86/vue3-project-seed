import { request } from '/@/utils/http/axios'
import { ContentTypeEnum } from '/@/utils/http/axios/AxiosEnum'
// 保存
// POST
// /sys/dict/data
export function createSysDictData(data: any) {
  return request.post({
    url: `/sys/dict/data`,
    data
  })
}

// 修改
// PUT
// /sys/dict/data
export function updateSysDictData(data: any) {
  return request.put({
    url: `/sys/dict/data`,
    data
  })
}

// 删除
// DELETE
// /sys/dict/data
export function deleteSysDictDataById(data: any) {
  return request.delete({
    url: `/sys/dict/data`,
    data
  })
}

// 根据type查询数据字典（加载下拉选）
// GET
// /sys/dict/data/loadSelect/{type}
export function getSysDictDataByType({ type }: any) {
  return request.get({
    url: `/sys/dict/data/loadSelect/{type}`,
  })
}

// 根据type及code查所有子类型
// GET
// /sys/dict/data/loadSelect/{type}/{code}
export function getSysDictDataByTypeAndCode({ type, code }: any) {
  return request.get({
    url: `/sys/dict/data/loadSelect/${type}/${code}`,
  })
}

// 字典数据
// GET
// /sys/dict/data/page
export function getSysDictDataPage(params: any) {
  return request.get({
    url: `/sys/dict/data/page`,
    params
  })
}

// 信息
// GET
// /sys/dict/data/{id}
export function getSysDictDataById({ id }: any) {
  return request.get({
    url: `/sys/dict/data/${id}`,
  })
}

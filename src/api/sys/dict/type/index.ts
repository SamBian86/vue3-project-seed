import { request } from '/@/utils/http/axios'

// 保存
// POST
// /sys/dict/type
export function createSysDictType(data: any) {
  return request.post({
    url: `/sys/dict/type`,
    data
  })
}

// 修改
// PUT
// /sys/dict/type
export function updateSysDictType(data: any) {
  return request.put({
    url: `/sys/dict/type`,
    data
  })
}

// 删除
// DELETE
// /sys/dict/type
export function deleteSysDictTypeById(data: any) {
  return request.delete({
    url: `/sys/dict/type`,
    data
  })
}

// 所有字典数据
// GET
// /sys/dict/type/all
export function getSysDictTypeAll() {
  return request.get({
    url: `/sys/dict/type/all`,
  })
}

// 字典类型
// GET
// /sys/dict/type/page
export function getSysDictTypePage(params: any) {
  return request.get({
    url: `/sys/dict/type/page`,
    params
  })
}

// 信息
// GET
// /sys/dict/type/{id}
export function getSysDictTypeById({ id }: any) {
  return request.get({
    url: `/sys/dict/type/${id}`,
  })
}

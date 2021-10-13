import { request } from '/@/utils/http/axios';
// PensionServerSequence

// 排序号更新
// PUT
// /pension/server/sequence/update
export function updatePensionServerSequence(params: any) {
  return request.put({
    url: `/pension/server/sequence/update`,
    params
  })
}

// 分页
// GET
// /pension/server/sequence/list
export function getPensionServerSequencePage(params: any) {
  return request.get({
    url: `/pension/server/sequence/list`,
    params
  })
}

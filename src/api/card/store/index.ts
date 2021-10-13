import { request } from '/@/utils/http/axios';

// 查询门店列表
// GET
// /card/store/select
export function getCardStoreList() {
  return request.get({
    url: `/card/store/select`,
  })
}

// 同步组织结构信息
// GET
// /card/store/storemsg/synchronize
export function getCardStoreStoremsgSynchronize() {
  return request.get({
    url: `/card/store/storemsg/synchronize`
  })
}

// 同步所有商户营收数据(时间段)
// GET
// /card/store/storeorderdata/daterange/synchronize
export function getCardStoreStoreorderdataDaterangeSynchronize(params: any) {
  return request.get({
    url: `/card/store/storeorderdata/daterange/synchronize`,
    params
  })
}

// 查询部门营收数据
// GET
// /card/store/storeorderdata/statistics
export function getCardStoreStoreorderdataStatistics(params: any) {
  return request.get({
    url: `/card/store/storeorderdata/statistics`,
    params
  })
}

// 同步所有商户营收数据(某一天)
// GET
// /card/store/storeorderdata/synchronize
export function getCardStoreStoreorderdataSynchronize(params: any) {
  return request.get({
    url: `/card/store/storeorderdata/synchronize`,
    params
  })
}


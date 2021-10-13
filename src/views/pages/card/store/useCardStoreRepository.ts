import { ref } from 'vue';
import {
  getCardStoreList,
  getCardStoreStoremsgSynchronize,
  getCardStoreStoreorderdataDaterangeSynchronize,
  getCardStoreStoreorderdataStatistics,
  getCardStoreStoreorderdataSynchronize
} from '/@/api/card/store';

export default function useCardStoreRepository() {
  const formData = ref({})
  const cardStoreList = ref([])
  const cardStoreStoremsgSynchronize = ref([])
  const cardStoreStoreorderdataDaterangeSynchronize = ref([])
  const cardStoreStoreorderdataStatistics = ref([])
  const cardStoreStoreorderdataSynchronize = ref([])

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 查询门店列表
  const getCardStoreListHandle = () => {
    return new Promise((resolve, reject) => {
      getCardStoreList().then((response: any) => {
        cardStoreList.value = response
        resolve(response)
      });
    })
  }

  // 同步组织结构信息
  const getCardStoreStoremsgSynchronizeHandle = () => {
    return new Promise((resolve, reject) => {
      getCardStoreStoremsgSynchronize().then((response: any) => {
        cardStoreStoremsgSynchronize.value = response
        resolve(response)
      });
    })
  }

  // 同步所有商户营收数据(时间段)
  const getCardStoreStoreorderdataDaterangeSynchronizeHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getCardStoreStoreorderdataDaterangeSynchronize(params).then((response: any) => {
        cardStoreStoreorderdataDaterangeSynchronize.value = response
        resolve(response)
      });
    })
  }

  // 查询部门营收数据
  const getCardStoreStoreorderdataStatisticsHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getCardStoreStoreorderdataStatistics(params).then((response: any) => {
        cardStoreStoreorderdataStatistics.value = response
        resolve(response)
      });
    })
  }

  // 同步所有商户营收数据(某一天)
  const getCardStoreStoreorderdataSynchronizeHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getCardStoreStoreorderdataSynchronize(params).then((response: any) => {
        cardStoreStoreorderdataSynchronize.value = response
        resolve(response)
      });
    })
  }

  return {
    formData,
    formPageResetHandle,
    cardStoreList,
    getCardStoreListHandle,
    cardStoreStoremsgSynchronize,
    getCardStoreStoremsgSynchronizeHandle,
    cardStoreStoreorderdataDaterangeSynchronize,
    getCardStoreStoreorderdataDaterangeSynchronizeHandle,
    cardStoreStoreorderdataStatistics,
    getCardStoreStoreorderdataStatisticsHandle,
    cardStoreStoreorderdataSynchronize,
    getCardStoreStoreorderdataSynchronizeHandle
  }
}


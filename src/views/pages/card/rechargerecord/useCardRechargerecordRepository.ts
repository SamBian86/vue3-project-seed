import { ref } from 'vue';
import {
  getCardRechargerecordPage,
  getCardRechargerecordById,
} from '/@/api/card/rechargerecord';

export default function useCardRechargerecordRepository() {
  const formData = ref({})

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getCardRechargerecordPage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 根据id获取数据
  const getCardRechargerecordByIdHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      getCardRechargerecordById(params).then((response: any) => {
        formData.value = response
        callback && callback()
        resolve(response)
      });
    })
  }


  return {
    formData,
    formPageResetHandle,
    getPageHandle,
    getCardRechargerecordByIdHandle,
  }
}


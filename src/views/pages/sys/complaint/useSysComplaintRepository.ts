import { ref } from 'vue';
import {
  updateSysComplaint,
  getSysComplaintPage,
  getSysComplaintDealById,
  getSysComplaintComplaintById,
} from '/@/api/sys/complaint';

export default function useSysComplaintRepository() {
  const formData = ref({})

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 处理
  const updateSysComplaintHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      updateSysComplaint(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getSysComplaintPage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 根据id获取处理详情
  const getSysComplaintDealByIdHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      getSysComplaintDealById(params).then((response: any) => {
        formData.value = response
        callback && callback()
        resolve(response)
      });
    })
  }

  // 根据id获取投诉详情
  const getSysComplaintComplaintByIdHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      getSysComplaintComplaintById(params).then((response: any) => {
        formData.value = response
        callback && callback()
        resolve(response)
      });
    })
  }

  return {
    formData,
    formPageResetHandle,
    updateSysComplaintHandle,
    getPageHandle,
    getSysComplaintDealByIdHandle,
    getSysComplaintComplaintByIdHandle
  }
}


import { ref } from 'vue';
import {
  createPensionMaintenanceapplication,
  assignPensionMaintenanceapplicationById,
  completePensionMaintenanceapplicationById,
  reAssignPensionMaintenanceapplicationById,
  getPensionMaintenanceapplicationPage,
  getPensionMaintenanceapplicationById,
} from '/@/api/pension/maintenanceapplication';

export default function usePensionMaintenanceapplicationRepository() {
  const formData = ref({})

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 后台补录业主报修信息
  const createPensionMaintenanceapplicationHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      createPensionMaintenanceapplication(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 指派维修任务
  const assignPensionMaintenanceapplicationByIdHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      assignPensionMaintenanceapplicationById(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 处理维修任务
  const completePensionMaintenanceapplicationByIdHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      completePensionMaintenanceapplicationById(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 重新指派
  const reAssignPensionMaintenanceapplicationByIdHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      reAssignPensionMaintenanceapplicationById(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getPensionMaintenanceapplicationPage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 根据id获取数据
  const getPensionMaintenanceapplicationByIdHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      getPensionMaintenanceapplicationById(params).then((response: any) => {
        formData.value = response
        callback && callback()
        resolve(response)
      });
    })
  }

  return {
    formData,
    formPageResetHandle,
    createPensionMaintenanceapplicationHandle,
    assignPensionMaintenanceapplicationByIdHandle,
    completePensionMaintenanceapplicationByIdHandle,
    reAssignPensionMaintenanceapplicationByIdHandle,
    getPageHandle,
    getPensionMaintenanceapplicationByIdHandle,
  }
}


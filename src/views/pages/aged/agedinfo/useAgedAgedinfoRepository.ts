import { ref } from 'vue';
import {
  createAgedAgedinfo,
  updateAgedAgedinfo,
  getAgedAgedinfoPage,
  batchImportUserAgedAgedinfo,
  exportAgedAgedinfo,
  getAgedAgedinfoById,
} from '/@/api/aged/agedinfo';

export default function useAgedAgedinfoRepository() {
  const formData = ref({})

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 创建
  const createAgedAgedinfoHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      createAgedAgedinfo(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 修改
  const updateAgedAgedinfoHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      updateAgedAgedinfo(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getAgedAgedinfoPage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 导出
  const exportHandle = (params: any) => {
    exportAgedAgedinfo(params)
  }

  // 根据id获取数据
  const getAgedAgedinfoByIdHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      getAgedAgedinfoById(params).then((response: any) => {
        formData.value = response
        callback && callback()
        resolve(response)
      });
    })
  }

  // 上传
  const batchImportUserAgedAgedinfoHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      batchImportUserAgedAgedinfo(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  return {
    formData,
    formPageResetHandle,
    createAgedAgedinfoHandle,
    updateAgedAgedinfoHandle,
    getPageHandle,
    exportHandle,
    getAgedAgedinfoByIdHandle,
    batchImportUserAgedAgedinfoHandle,
  }
}


import { ref } from 'vue';
import {
  createPensionTool,
  updatePensionTool,
  getPensionToolPage,
  getPensionToolById,
  deletePensionToolById,
  exchangePensionTool
} from '/@/api/pension/tool';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n'

export default function usePensionToolRepository() {
  const { t } = useI18n()
  const formData = ref({})

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 创建
  const createPensionToolHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      createPensionTool(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 修改
  const updatePensionToolHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      updatePensionTool(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getPensionToolPage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 根据id获取数据
  const getPensionToolByIdHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      getPensionToolById(params).then((response: any) => {
        formData.value = response
        callback && callback()
        resolve(response)
      });
    })
  }

  // 删除
  const deletePensionToolByIdHandle = (params: any, callback: any) => {
    ElMessageBox.confirm(t('table.deleteTipMessage'), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        deletePensionToolById(params).then(() => {
          ElMessage({
            type: 'success',
            message: t('table.deleteSuccessMessage'),
          });
          callback && callback()
        });
      })
      .catch(() => {
      });
  }

  // 显示次序更替
  const exchangePensionToolHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      exchangePensionTool(params).then((response: any) => {
        callback && callback()
        return resolve(response)
      });
    })
  }

  return {
    formData,
    formPageResetHandle,
    createPensionToolHandle,
    updatePensionToolHandle,
    getPageHandle,
    getPensionToolByIdHandle,
    deletePensionToolByIdHandle,
    exchangePensionToolHandle,
  }
}


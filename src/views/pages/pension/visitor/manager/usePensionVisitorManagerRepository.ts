import { ref } from 'vue';
import {
  createPensionVisitorManager,
  updatePensionVisitorManager,
  getPensionVisitorManagerPage,
  getPensionVisitorManagerById,
  deletePensionVisitorManagerById,
} from '/@/api/pension/visitor/manager';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n'

export default function usePensionVisitorManagerRepository() {
  const { t } = useI18n()
  const formData = ref({})

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 创建
  const createPensionVisitorManagerHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      createPensionVisitorManager(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 修改
  const updatePensionVisitorManagerHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      updatePensionVisitorManager(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getPensionVisitorManagerPage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 根据id获取数据
  const getPensionVisitorManagerByIdHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      getPensionVisitorManagerById(params).then((response: any) => {
        formData.value = response
        callback && callback()
        resolve(response)
      });
    })
  }

  // 删除
  const deletePensionVisitorManagerByIdHandle = (params: any, callback: any) => {
    ElMessageBox.confirm(t('table.deleteTipMessage'), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        deletePensionVisitorManagerById(params).then(() => {
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

  return {
    formData,
    formPageResetHandle,
    createPensionVisitorManagerHandle,
    updatePensionVisitorManagerHandle,
    getPageHandle,
    getPensionVisitorManagerByIdHandle,
    deletePensionVisitorManagerByIdHandle,
  }
}


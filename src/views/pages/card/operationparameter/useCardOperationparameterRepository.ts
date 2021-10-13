import { ref } from 'vue';
import {
  createCardOperationparameter,
  updateCardOperationparameter,
  getCardOperationparameterPage,
  getCardOperationparameterById,
  deleteCardOperationparameterById,
  lockCardOperationparameter,
} from '/@/api/card/operationparameter';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n'

export default function useCardOperationparameterRepository() {
  const { t } = useI18n()
  const formData = ref({})

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 创建
  const createCardOperationparameterHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      createCardOperationparameter(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 修改
  const updateCardOperationparameterHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      updateCardOperationparameter(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getCardOperationparameterPage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 根据id获取数据
  const getCardOperationparameterByIdHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      getCardOperationparameterById(params).then((response: any) => {
        formData.value = response
        callback && callback()
        resolve(response)
      });
    })
  }

  // 删除
  const deleteCardOperationparameterByIdHandle = (params: any, callback: any) => {
    ElMessageBox.confirm(t('table.deleteTipMessage'), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        deleteCardOperationparameterById(params).then(() => {
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

  // 锁定/解锁业务系统
  const lockCardOperationparameterHandle = (params: any, callback: any) => {
    const { lock } = params
    ElMessageBox.confirm(lock === 1 ? t('table.lockTipMessage') : t('table.unlockTipMessage'), t('global.tips'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        lockCardOperationparameter(params).then(() => {
          ElMessage({
            type: 'success',
            message: t('table.actionSuccessMessage'),
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
    createCardOperationparameterHandle,
    updateCardOperationparameterHandle,
    getPageHandle,
    getCardOperationparameterByIdHandle,
    deleteCardOperationparameterByIdHandle,
    lockCardOperationparameterHandle,
  }
}


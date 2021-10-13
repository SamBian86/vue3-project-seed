import { ref } from 'vue';
import {
  createCardOperationinterface,
  updateCardOperationinterface,
  getCardOperationinterfaceSelect,
  getCardOperationinterfacePage,
  getCardOperationinterfaceById,
  deleteCardOperationinterfaceById,
  lockCardOperationinterface,
} from '/@/api/card/operationinterface';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n'

export default function useCardOperationinterfaceRepository() {
  const { t } = useI18n()
  const formData = ref({})
  const cardOperationinterfaceSelect = ref([])

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 创建
  const createCardOperationinterfaceHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      createCardOperationinterface(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 修改
  const updateCardOperationinterfaceHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      updateCardOperationinterface(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 获取列表数据
  const getCardOperationinterfaceSelectHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getCardOperationinterfaceSelect(params).then((response: any) => {
        cardOperationinterfaceSelect.value = response
        resolve(response)
      });
    })
  }


  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getCardOperationinterfacePage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 根据id获取数据
  const getCardOperationinterfaceByIdHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      getCardOperationinterfaceById(params).then((response: any) => {
        formData.value = response
        callback && callback()
        resolve(response)
      });
    })
  }

  // 删除
  const deleteCardOperationinterfaceByIdHandle = (params: any, callback: any) => {
    ElMessageBox.confirm(t('table.deleteTipMessage'), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        deleteCardOperationinterfaceById(params).then(() => {
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
  const lockCardOperationinterfaceHandle = (params: any, callback: any) => {
    const { lock } = params
    ElMessageBox.confirm(lock === 1 ? t('table.lockTipMessage') : t('table.unlockTipMessage'), t('global.tips'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        lockCardOperationinterface(params).then(() => {
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
    createCardOperationinterfaceHandle,
    updateCardOperationinterfaceHandle,
    cardOperationinterfaceSelect,
    getCardOperationinterfaceSelectHandle,
    getPageHandle,
    getCardOperationinterfaceByIdHandle,
    deleteCardOperationinterfaceByIdHandle,
    lockCardOperationinterfaceHandle,
  }
}


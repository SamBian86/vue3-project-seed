import { ref } from 'vue';
import {
  createCardOperationinfo,
  updateCardOperationinfo,
  getCardOperationinfoSelect,
  getCardOperationinfoPage,
  getCardOperationinfoById,
  deleteCardOperationinfoById,
  lockCardOperationinfo,
  callCardOperationinfoByInterfaceName
} from '/@/api/card/operationinfo';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n'

export default function useCardOperationinfoRepository() {
  const { t } = useI18n()
  const formData = ref({})
  const cardOperationinfoSelect = ref([])

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 创建
  const createCardOperationinfoHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      createCardOperationinfo(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 修改
  const updateCardOperationinfoHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      updateCardOperationinfo(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 获取列表数据
  const getCardOperationinfoSelectHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getCardOperationinfoSelect(params).then((response: any) => {
        cardOperationinfoSelect.value = response
        resolve(response)
      });
    })
  }

  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getCardOperationinfoPage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 根据id获取数据
  const getCardOperationinfoByIdHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      getCardOperationinfoById(params).then((response: any) => {
        formData.value = response
        callback && callback()
        resolve(response)
      });
    })
  }

  // 删除
  const deleteCardOperationinfoByIdHandle = (params: any, callback: any) => {
    ElMessageBox.confirm(t('table.deleteTipMessage'), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        deleteCardOperationinfoById(params).then(() => {
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
  const lockCardOperationinfoHandle = (params: any, callback: any) => {
    const { isdisplay } = params
    ElMessageBox.confirm(isdisplay === 1 ? t('table.onTipMessage') : t('table.offTipMessage'), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        lockCardOperationinfo(params).then(() => {
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

  // 业务系统接口调用
  const callCardOperationinfoByInterfaceNameHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      callCardOperationinfoByInterfaceName(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  return {
    formData,
    formPageResetHandle,
    createCardOperationinfoHandle,
    updateCardOperationinfoHandle,
    cardOperationinfoSelect,
    getCardOperationinfoSelectHandle,
    getPageHandle,
    getCardOperationinfoByIdHandle,
    deleteCardOperationinfoByIdHandle,
    lockCardOperationinfoHandle,
    callCardOperationinfoByInterfaceNameHandle
  }
}


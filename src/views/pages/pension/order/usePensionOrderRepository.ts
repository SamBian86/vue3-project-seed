import { ref } from 'vue';
import {
  createPensionOrder,
  updatePensionOrder,
  getPensionOrderPage,
  getPensionOrderGroup,
  getPensionOrderById,
  deletePensionOrderById,
  cancelPensionOrder,
  dispatchPensionOrder,
  verificationPensionOrder,
} from '/@/api/pension/order';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n'

export default function usePensionOrderRepository() {
  const { t } = useI18n()
  const formData = ref({})
  const pensionOrderGroup = ref([])

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 创建
  const createPensionOrderHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      createPensionOrder(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 修改
  const updatePensionOrderHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      updatePensionOrder(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getPensionOrderPage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 查询分组订单列表
  const getPensionOrderGroupHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getPensionOrderGroup(params).then((response: any) => {
        pensionOrderGroup.value = response
        resolve(response)
      });
    })
  }

  // 根据id获取数据
  const getPensionOrderByIdHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      getPensionOrderById(params).then((response: any) => {
        formData.value = response
        callback && callback()
        resolve(response)
      });
    })
  }

  // 删除
  const deletePensionOrderByIdHandle = (params: any, callback: any) => {
    ElMessageBox.confirm(t('table.deleteTipMessage'), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        deletePensionOrderById(params).then(() => {
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

  // 取消订单
  const cancelPensionOrderHandle = (params: any, callback: any) => {
    ElMessageBox.confirm(t('PensionOrder.cancelTipMessage'), t('PensionOrder.tip'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        cancelPensionOrder(params).then(() => {
          ElMessage({
            type: 'success',
            message: t('PensionOrder.cancelSuccessMessage'),
          });
          callback && callback()
        });
      })
      .catch(() => {
      });
  }

  // 派单
  const dispatchPensionOrderHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      dispatchPensionOrder(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 订单核销
  const verificationPensionOrderHandle = (params: any, callback: any) => {
    ElMessageBox.confirm(t('PensionOrder.verificationTipMessage'), t('PensionOrder.tip'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        verificationPensionOrder(params).then(() => {
          ElMessage({
            type: 'success',
            message: t('PensionOrder.verificationSuccessMessage'),
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
    createPensionOrderHandle,
    updatePensionOrderHandle,
    getPageHandle,
    pensionOrderGroup,
    getPensionOrderGroupHandle,
    getPensionOrderByIdHandle,
    deletePensionOrderByIdHandle,
    cancelPensionOrderHandle,
    dispatchPensionOrderHandle,
    verificationPensionOrderHandle
  }
}


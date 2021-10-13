import { ref } from 'vue';
import {
  createCardInfo,
  updateCardInfo,
  getCardInfoPage,
  getCardInfoById,
  deleteCardInfoById
} from '/@/api/card/info';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n'

export default function useCardInfoRepository() {
  const { t } = useI18n()
  const formData = ref({})

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 创建
  const createCardInfoHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      createCardInfo(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 修改
  const updateCardInfoHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      updateCardInfo(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getCardInfoPage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 根据id获取数据
  const getCardInfoByIdHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      getCardInfoById(params).then((response: any) => {
        formData.value = response
        callback && callback()
        resolve(response)
      });
    })
  }

  // 注销
  const dischargeCardInfoByIdHandle = (params: any, callback: any) => {
    ElMessageBox.confirm(t('CardInfo.dischargeTipMessage'), t('global.tips'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        deleteCardInfoById(params).then(() => {
          ElMessage({
            type: 'success',
            message: t('CardInfo.deleteSuccessMessage'),
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
    createCardInfoHandle,
    updateCardInfoHandle,
    getPageHandle,
    getCardInfoByIdHandle,
    dischargeCardInfoByIdHandle,
  }
}


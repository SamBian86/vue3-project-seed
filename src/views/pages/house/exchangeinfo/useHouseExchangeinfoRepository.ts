import { ref } from 'vue';
import {
  createHouseExchangeinfo,
  updateHouseExchangeinfo,
  publishHouseExchangeinfo,
  getHouseExchangeinfoPage,
  getHouseExchangeinfoById,
  deleteHouseExchangeinfoById,
  displayHouseExchangeinfo,
} from '/@/api/house/exchangeinfo';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n'

export default function useHouseExchangeinfoRepository() {
  const { t } = useI18n()
  const formData = ref({})

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 创建
  const createHouseExchangeinfoHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      createHouseExchangeinfo(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 修改
  const updateHouseExchangeinfoHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      updateHouseExchangeinfo(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 发布
  const publishHouseExchangeinfoHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      publishHouseExchangeinfo(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getHouseExchangeinfoPage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 根据id获取数据
  const getHouseExchangeinfoByIdHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      getHouseExchangeinfoById(params).then((response: any) => {
        formData.value = response.houseExchangeInfo
        callback && callback()
        resolve(response)
      });
    })
  }

  // 删除
  const deleteHouseExchangeinfoByIdHandle = (params: any, callback: any) => {
    ElMessageBox.confirm(t('table.deleteTipMessage'), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        deleteHouseExchangeinfoById(params).then(() => {
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

  // 上/下架
  const displayHouseExchangeinfoHandle = (params: any, callback: any) => {
    const { status } = params
    ElMessageBox.confirm(status === 1 ? t('table.onTipMessage') : t('table.offTipMessage'), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        displayHouseExchangeinfo(params).then(() => {
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
    createHouseExchangeinfoHandle,
    updateHouseExchangeinfoHandle,
    publishHouseExchangeinfoHandle,
    getPageHandle,
    getHouseExchangeinfoByIdHandle,
    deleteHouseExchangeinfoByIdHandle,
    displayHouseExchangeinfoHandle,
  }
}


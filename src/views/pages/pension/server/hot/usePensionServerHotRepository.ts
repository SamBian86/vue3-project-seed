import { ref } from 'vue';
import {
  createPensionServerHot,
  updatePensionServerHot,
  getPensionServerHotPage,
  deletePensionServerHotById,
  exchangePensionServerHot
} from '/@/api/pension/server/hot';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n'

export default function usePensionServerHotRepository() {
  const { t } = useI18n()
  const formData = ref({})

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 创建
  const createPensionServerHotHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      createPensionServerHot(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 修改
  const updatePensionServerHotHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      updatePensionServerHot(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getPensionServerHotPage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 删除
  const deletePensionServerHotByIdHandle = (params: any, callback: any) => {
    ElMessageBox.confirm(t('table.deleteTipMessage'), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        deletePensionServerHotById(params).then(() => {
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
  const exchangePensionServerHotHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      exchangePensionServerHot(params).then((response: any) => {
        callback && callback()
        return resolve(response)
      });
    })
  }

  return {
    formData,
    formPageResetHandle,
    createPensionServerHotHandle,
    updatePensionServerHotHandle,
    getPageHandle,
    deletePensionServerHotByIdHandle,
    exchangePensionServerHotHandle,
  }
}


import { ref } from 'vue';
import {
  createPensionParty,
  updatePensionParty,
  getPensionPartyPage,
  getPensionPartyById,
  deletePensionPartyById,
  displayPensionParty,
} from '/@/api/pension/party';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n'

export default function usePensionPartyRepository() {
  const { t } = useI18n()
  const formData = ref({})

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 创建
  const createPensionPartyHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      createPensionParty(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 修改
  const updatePensionPartyHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      updatePensionParty(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getPensionPartyPage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 根据id获取数据
  const getPensionPartyByIdHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      getPensionPartyById(params).then((response: any) => {
        formData.value = response
        callback && callback()
        resolve(response)
      });
    })
  }

  // 删除
  const deletePensionPartyByIdHandle = (params: any, callback: any) => {
    ElMessageBox.confirm(t('table.deleteTipMessage'), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        deletePensionPartyById(params).then(() => {
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
  const displayPensionPartyHandle = (params: any, callback: any) => {
    const { display } = params
    ElMessageBox.confirm(display === 1 ? t('table.onTipMessage') : t('table.offTipMessage'), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        displayPensionParty(params).then(() => {
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
    createPensionPartyHandle,
    updatePensionPartyHandle,
    getPageHandle,
    getPensionPartyByIdHandle,
    deletePensionPartyByIdHandle,
    displayPensionPartyHandle,
  }
}


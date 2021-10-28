import { ref } from 'vue';
import {
  createPensionGovernment,
  updatePensionGovernment,
  getPensionGovernmentPage,
  getPensionGovernmentById,
  deletePensionGovernmentById,
  displayPensionGovernment,
} from '/@/api/pension/government';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n'

export default function usePensionGovernmentRepository() {
  const { t } = useI18n()
  const formData = ref({})

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 创建
  const createPensionGovernmentHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      createPensionGovernment(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 修改
  const updatePensionGovernmentHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      updatePensionGovernment(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getPensionGovernmentPage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 根据id获取数据
  const getPensionGovernmentByIdHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      getPensionGovernmentById(params).then((response: any) => {
        formData.value = response
        callback && callback()
        resolve(response)
      });
    })
  }

  // 删除
  const deletePensionGovernmentByIdHandle = (params: any, callback: any) => {
    ElMessageBox.confirm(t('table.deleteTipMessage'), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        deletePensionGovernmentById(params).then(() => {
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
  const displayPensionGovernmentHandle = (params: any, callback: any) => {
    const { display } = params
    ElMessageBox.confirm(display === 1 ? t('table.onTipMessage') : t('table.offTipMessage'), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        displayPensionGovernment(params).then(() => {
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
    createPensionGovernmentHandle,
    updatePensionGovernmentHandle,
    getPageHandle,
    getPensionGovernmentByIdHandle,
    deletePensionGovernmentByIdHandle,
    displayPensionGovernmentHandle,
  }
}


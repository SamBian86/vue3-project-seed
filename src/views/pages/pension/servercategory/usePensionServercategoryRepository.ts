import { ref } from 'vue';
import {
  createPensionServercategory,
  updatePensionServercategory,
  getPensionServercategoryListAll,
  getPensionServercategoryPage,
  getPensionServercategoryById,
  deletePensionServercategoryById,
  deletePensionServercategoryByIds,
  displayPensionServercategory,
} from '/@/api/pension/servercategory';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n'

export default function usePensionServercategoryRepository() {
  const { t } = useI18n()
  const formData = ref({})
  const pensionServercategoryListAll = ref([])

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 创建
  const createPensionServercategoryHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      createPensionServercategory(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 修改
  const updatePensionServercategoryHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      updatePensionServercategory(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 获取列表数据
  const getPensionServercategoryListAllHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getPensionServercategoryListAll(params).then((response: any) => {
        pensionServercategoryListAll.value = response
        resolve(response)
      });
    })
  }

  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getPensionServercategoryPage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 根据id获取数据
  const getPensionServercategoryByIdHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      getPensionServercategoryById(params).then((response: any) => {
        formData.value = response
        callback && callback()
        resolve(response)
      });
    })
  }

  // 删除
  const deletePensionServercategoryByIdHandle = (params: any, callback: any) => {
    ElMessageBox.confirm(t('table.deleteTipMessage'), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        deletePensionServercategoryById(params).then(() => {
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

  // 删除多个
  const deletePensionServercategoryByIdsHandle = (params: any, callback: any) => {
    const len = params.length
    if (!len) {
      return false
    }
    ElMessageBox.confirm(t('table.deleteTipWithMessage', { message: len }), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        deletePensionServercategoryByIds(params).then(() => {
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
  const displayPensionServercategoryHandle = (params: any, callback: any) => {
    const { isdisplay } = params
    ElMessageBox.confirm(isdisplay === 1 ? t('table.onTipMessage') : t('table.offTipMessage'), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        displayPensionServercategory(params).then(() => {
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
    createPensionServercategoryHandle,
    updatePensionServercategoryHandle,
    pensionServercategoryListAll,
    getPensionServercategoryListAllHandle,
    getPageHandle,
    getPensionServercategoryByIdHandle,
    deletePensionServercategoryByIdHandle,
    deletePensionServercategoryByIdsHandle,
    displayPensionServercategoryHandle,
  }
}


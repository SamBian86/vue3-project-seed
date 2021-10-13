import { ref } from 'vue';
import {
  createPensionServerscale,
  updatePensionServerscale,
  getPensionServerscaleListAll,
  getPensionServerscalePage,
  getPensionServerscaleById,
  deletePensionServerscaleById,
} from '/@/api/pension/serverscale';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n'

export default function usePensionServerscaleRepository() {
  const { t } = useI18n()
  const formData = ref({})
  const pensionServerscaleListAll = ref([])

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 创建
  const createPensionServerscaleHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      createPensionServerscale(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 修改
  const updatePensionServerscaleHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      updatePensionServerscale(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 获取列表数据
  const getPensionServerscaleListAllHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getPensionServerscaleListAll(params).then((response: any) => {
        pensionServerscaleListAll.value = response
        resolve(response)
      });
    })
  }

  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getPensionServerscalePage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 根据id获取数据
  const getPensionServerscaleByIdHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      getPensionServerscaleById(params).then((response: any) => {
        formData.value = response
        callback && callback()
        resolve(response)
      });
    })
  }

  // 删除
  const deletePensionServerscaleByIdHandle = (params: any, callback: any) => {
    ElMessageBox.confirm(t('table.deleteTipMessage'), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        deletePensionServerscaleById(params).then(() => {
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

  return {
    formData,
    formPageResetHandle,
    createPensionServerscaleHandle,
    updatePensionServerscaleHandle,
    pensionServerscaleListAll,
    getPensionServerscaleListAllHandle,
    getPageHandle,
    getPensionServerscaleByIdHandle,
    deletePensionServerscaleByIdHandle,
  }
}


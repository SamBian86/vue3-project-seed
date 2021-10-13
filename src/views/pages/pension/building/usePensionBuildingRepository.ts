import { ref } from 'vue';
import {
  createPensionBuilding,
  updatePensionBuilding,
  getPensionBuildingListAll,
  getPensionBuildingPage,
  getPensionBuildingById,
  deletePensionBuildingById,
} from '/@/api/pension/building';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n'

export default function usePensionBuildingRepository() {
  const { t } = useI18n()
  const formData = ref({})
  const pensionBuildingListAll = ref([])

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 创建
  const createPensionBuildingHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      createPensionBuilding(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 修改
  const updatePensionBuildingHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      updatePensionBuilding(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 获取列表数据
  const getPensionBuildingListAllHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getPensionBuildingListAll(params).then((response: any) => {
        pensionBuildingListAll.value = response
        resolve(response)
      });
    })
  }

  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getPensionBuildingPage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 根据id获取数据
  const getPensionBuildingByIdHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      getPensionBuildingById(params).then((response: any) => {
        formData.value = response
        callback && callback()
        resolve(response)
      });
    })
  }

  // 删除
  const deletePensionBuildingByIdHandle = (params: any, callback: any) => {
    ElMessageBox.confirm(t('table.deleteTipMessage'), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        deletePensionBuildingById(params).then(() => {
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
    createPensionBuildingHandle,
    updatePensionBuildingHandle,
    pensionBuildingListAll,
    getPensionBuildingListAllHandle,
    getPageHandle,
    getPensionBuildingByIdHandle,
    deletePensionBuildingByIdHandle,
  }
}


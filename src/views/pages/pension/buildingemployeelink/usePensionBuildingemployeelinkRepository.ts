import { ref } from 'vue';
import {
  createPensionBuildingemployeelink,
  getPensionBuildingemployeelinkListById,
  deletePensionBuildingemployeelinkById,
} from '/@/api/pension/buildingemployeelink';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n'

export default function usePensionBuildingemployeelinkRepository() {
  const { t } = useI18n()
  const formData = ref({})
  const pensionBuildingemployeelinkList = ref([])

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 楼栋绑定管家
  const createPensionBuildingemployeelinkHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      createPensionBuildingemployeelink(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 查询楼栋的管家集合
  const getPensionBuildingemployeelinkListByIdHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      getPensionBuildingemployeelinkListById(params).then((response: any) => {
        pensionBuildingemployeelinkList.value = response
        callback && callback()
        resolve(response)
      });
    })
  }

  // 楼栋解绑管家
  const deletePensionBuildingemployeelinkByIdHandle = (params: any, callback: any) => {
    ElMessageBox.confirm(t('PensionBuilding.deleteTipMessage'), t('table.tips'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        deletePensionBuildingemployeelinkById(params).then(() => {
          ElMessage({
            type: 'success',
            message: t('PensionBuilding.deleteSuccessMessage'),
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
    createPensionBuildingemployeelinkHandle,
    pensionBuildingemployeelinkList,
    getPensionBuildingemployeelinkListByIdHandle,
    deletePensionBuildingemployeelinkByIdHandle,
  }
}


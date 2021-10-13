import { ref } from 'vue';
import {
  createPensionMaintenanceworker,
  updatePensionMaintenanceworker,
  getPensionMaintenanceworkerListById,
  getPensionMaintenanceworkerPage,
  getPensionMaintenanceworkerById,
  deletePensionMaintenanceworkerById,
} from '/@/api/pension/maintenanceworker';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n'

export default function usePensionMaintenanceworkerRepository() {
  const { t } = useI18n()
  const formData = ref({})
  const pensionMaintenanceworkerList = ref([])

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 创建
  const createPensionMaintenanceworkerHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      createPensionMaintenanceworker(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 修改
  const updatePensionMaintenanceworkerHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      updatePensionMaintenanceworker(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 查询社区的维修人员（下拉框）
  const getPensionMaintenanceworkerListByIdHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getPensionMaintenanceworkerListById(params).then((response: any) => {
        pensionMaintenanceworkerList.value = response
        resolve(response)
      });
    })
  }

  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getPensionMaintenanceworkerPage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 根据id获取数据
  const getPensionMaintenanceworkerByIdHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      getPensionMaintenanceworkerById(params).then((response: any) => {
        formData.value = response
        callback && callback()
        resolve(response)
      });
    })
  }

  // 删除
  const deletePensionMaintenanceworkerByIdHandle = (params: any, callback: any) => {
    ElMessageBox.confirm(t('table.deleteTipMessage'), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        deletePensionMaintenanceworkerById(params).then(() => {
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
    createPensionMaintenanceworkerHandle,
    updatePensionMaintenanceworkerHandle,
    pensionMaintenanceworkerList,
    getPensionMaintenanceworkerListByIdHandle,
    getPageHandle,
    getPensionMaintenanceworkerByIdHandle,
    deletePensionMaintenanceworkerByIdHandle,
  }
}


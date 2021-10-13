import { ref } from 'vue';
import {
  createPensionFamily,
  updatePensionFamily,
  getPensionFamilyListAll,
  getPensionFamilyOwnership,
  getPensionFamilyPermissionListAll,
  getPensionFamilyPage,
  getPensionFamilyById,
  deletePensionFamilyById,
} from '/@/api/pension/family';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n'

export default function usePensionFamilyRepository() {
  const { t } = useI18n()
  const formData = ref({})
  const pensionFamilyListAll = ref([])
  const pensionFamilyOwnership = ref([])
  const pensionFamilyPermissionListAll = ref([])

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 创建
  const createPensionFamilyHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      createPensionFamily(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 修改
  const updatePensionFamilyHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      updatePensionFamily(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 获取列表数据
  const getPensionFamilyListAllHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getPensionFamilyListAll(params).then((response: any) => {
        pensionFamilyListAll.value = response
        resolve(response)
      });
    })
  }

  // 查询住户所有家庭信息列表
  const getPensionFamilyOwnershipHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getPensionFamilyOwnership(params).then((response: any) => {
        pensionFamilyOwnership.value = response
        resolve(response)
      });
    })
  }

  // 查询家庭列表(权限过滤)
  const getPensionFamilyPermissionListAllHandle = () => {
    return new Promise((resolve, reject) => {
      getPensionFamilyPermissionListAll().then((response: any) => {
        pensionFamilyPermissionListAll.value = response
        resolve(response)
      });
    })
  }

  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getPensionFamilyPage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 根据id获取数据
  const getPensionFamilyByIdHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      getPensionFamilyById(params).then((response: any) => {
        formData.value = response
        callback && callback()
        resolve(response)
      });
    })
  }

  // 删除
  const deletePensionFamilyByIdHandle = (params: any, callback: any) => {
    ElMessageBox.confirm(t('table.deleteTipMessage'), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        deletePensionFamilyById(params).then(() => {
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
    createPensionFamilyHandle,
    updatePensionFamilyHandle,
    pensionFamilyListAll,
    getPensionFamilyListAllHandle,
    pensionFamilyOwnership,
    getPensionFamilyOwnershipHandle,
    pensionFamilyPermissionListAll,
    getPensionFamilyPermissionListAllHandle,
    getPageHandle,
    getPensionFamilyByIdHandle,
    deletePensionFamilyByIdHandle,
  }
}


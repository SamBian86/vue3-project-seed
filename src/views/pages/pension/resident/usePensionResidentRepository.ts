import { ref } from 'vue';
import {
  createPensionResident,
  exportPensionResident,
  importPensionResident,
  updatePensionResident,
  getPensionResidentListAll,
  getPensionResidentPage,
  exportPensionResidentTemplate,
  getPensionResidentById,
  getPensionResidentInfo,
  getPensionResidentPhonelist,
  deletePensionResidentById,
} from '/@/api/pension/resident';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n'

export default function usePensionResidentRepository() {
  const { t } = useI18n()
  const formData = ref({})
  formData.value.resident = ref({})
  formData.value.residentHealth = ref({})
  formData.value.residentRelationList = ref([])
  const pensionResidentInfo = ref({})
  const pensionResidentListAll = ref([])
  const pensionResidentPhonelist = ref([])

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    // formData.value = {}
    formData.value.resident = {}
    formData.value.residentHealth = {}
    formData.value.residentRelationList = []
    callback && callback()
  }

  // 创建
  const createPensionResidentHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      createPensionResident(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 修改
  const updatePensionResidentHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      updatePensionResident(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 获取列表数据
  const getPensionResidentListAllHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getPensionResidentListAll(params).then((response: any) => {
        pensionResidentListAll.value = response
        resolve(response)
      });
    })
  }

  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getPensionResidentPage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 下载
  const exportPensionResidentTemplateHandle = (params: any) => {
    exportPensionResidentTemplate(params)
  }
  
  // 导出
  const exportHandle = (params: any) => {
    exportPensionResident(params)
  }

  // 根据id获取数据
  const getPensionResidentByIdHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      getPensionResidentById(params).then((response: any) => {
        // formData.value = response
        formData.value.resident = response.resident || {}
        if(response.resident) {
          formData.value.resident.hobby = response.resident.hobby ? response.resident.hobby.split(',') : []
          formData.value.resident.serviceDemand = response.resident.serviceDemand ? response.resident.serviceDemand.split(',') : []
        }

        formData.value.residentHealth = response.residentHealth || {}
        if (response.residentHealth) {
          formData.value.residentHealth.drugAllergyHistory = response.residentHealth.drugAllergyHistory ? response.residentHealth.drugAllergyHistory.split(',') : []
          formData.value.residentHealth.familyMedicalHistory = response.residentHealth.familyMedicalHistory ? response.residentHealth.familyMedicalHistory.split(',') : []
          formData.value.residentHealth.chronicDisease = response.residentHealth.chronicDisease ? response.residentHealth.chronicDisease.split(',') : []
        }

        formData.value.residentRelationList = response.residentRelationList
        callback && callback()
        resolve(response)
      });
    })
  }

  // 获取住户信息
  const getPensionResidentInfoHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      getPensionResidentInfo(params).then((response: any) => {
        pensionResidentInfo.value = response
        callback && callback()
        resolve(response)
      });
    })
  }

  // 查询住户手机号
  const getPensionResidentPhonelistHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      getPensionResidentPhonelist(params).then((response: any) => {
        pensionResidentPhonelist.value = response
        callback && callback()
        resolve(response)
      });
    })
  }

  // 删除
  const deletePensionResidentByIdHandle = (params: any, callback: any) => {
    ElMessageBox.confirm(t('table.deleteTipMessage'), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        deletePensionResidentById(params).then(() => {
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

  // 导入
  const importPensionResidentHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      importPensionResident(params).then((response: any) => {
        const { code, msg } = response.data
        if (code !== 0) {
          ElMessage({
            type: 'error',
            message: msg
          });
        } else {
          resolve(response)
        }
      });
    })
  }

  return {
    formData,
    formPageResetHandle,
    createPensionResidentHandle,
    updatePensionResidentHandle,
    pensionResidentListAll,
    getPensionResidentListAllHandle,
    pensionResidentInfo,
    getPensionResidentInfoHandle,
    pensionResidentPhonelist,
    getPensionResidentPhonelistHandle,
    getPageHandle,
    exportPensionResidentTemplateHandle,
    exportHandle,
    getPensionResidentByIdHandle,
    deletePensionResidentByIdHandle,
    importPensionResidentHandle
  }
}


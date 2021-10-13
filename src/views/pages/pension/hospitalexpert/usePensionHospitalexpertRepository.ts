import { ref } from 'vue';
import {
  createPensionHospitalexpert,
  updatePensionHospitalexpert,
  getPensionHospitalexpertListAll,
  getPensionHospitalexpertPage,
  getPensionHospitalexpertById,
  deletePensionHospitalexpertById,
} from '/@/api/pension/hospitalexpert';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n'

export default function usePensionHospitalexpertRepository() {
  const { t } = useI18n()
  const formData = ref({})
  const pensionHospitalexpertListAll = ref([])

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 创建
  const createPensionHospitalexpertHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      createPensionHospitalexpert(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 修改
  const updatePensionHospitalexpertHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      updatePensionHospitalexpert(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 获取列表数据
  const getPensionHospitalexpertListAllHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getPensionHospitalexpertListAll(params).then((response: any) => {
        pensionHospitalexpertListAll.value = response
        resolve(response)
      });
    })
  }

  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getPensionHospitalexpertPage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 根据id获取数据
  const getPensionHospitalexpertByIdHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      getPensionHospitalexpertById(params).then((response: any) => {
        formData.value = response
        callback && callback()
        resolve(response)
      });
    })
  }

  // 删除
  const deletePensionHospitalexpertByIdHandle = (params: any, callback: any) => {
    ElMessageBox.confirm(t('table.deleteTipMessage'), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        deletePensionHospitalexpertById(params).then(() => {
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
    createPensionHospitalexpertHandle,
    updatePensionHospitalexpertHandle,
    pensionHospitalexpertListAll,
    getPensionHospitalexpertListAllHandle,
    getPageHandle,
    getPensionHospitalexpertByIdHandle,
    deletePensionHospitalexpertByIdHandle,
  }
}


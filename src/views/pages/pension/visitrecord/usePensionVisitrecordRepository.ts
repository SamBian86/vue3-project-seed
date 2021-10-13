import { ref } from 'vue';
import {
  createPensionVisitrecord,
  updatePensionVisitrecord,
  getPensionVisitrecordListAll,
  getPensionVisitrecordPage,
  getPensionVisitrecordById,
  deletePensionVisitrecordById,
} from '/@/api/pension/visitrecord';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n'

export default function usePensionVisitrecordRepository() {
  const { t } = useI18n()
  const formData = ref({})
  const pensionVisitrecordListAll = ref([])

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 创建
  const createPensionVisitrecordHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      createPensionVisitrecord(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 修改
  const updatePensionVisitrecordHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      updatePensionVisitrecord(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 获取列表数据
  const getPensionVisitrecordListAllHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getPensionVisitrecordListAll(params).then((response: any) => {
        pensionVisitrecordListAll.value = response
        resolve(response)
      });
    })
  }


  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getPensionVisitrecordPage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 根据id获取数据
  const getPensionVisitrecordByIdHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      getPensionVisitrecordById(params).then((response: any) => {
        formData.value = response
        callback && callback()
        resolve(response)
      });
    })
  }

  // 删除
  const deletePensionVisitrecordByIdHandle = (params: any, callback: any) => {
    ElMessageBox.confirm(t('table.deleteTipMessage'), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        deletePensionVisitrecordById(params).then(() => {
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
    createPensionVisitrecordHandle,
    updatePensionVisitrecordHandle,
    pensionVisitrecordListAll,
    getPensionVisitrecordListAllHandle,
    getPageHandle,
    getPensionVisitrecordByIdHandle,
    deletePensionVisitrecordByIdHandle,
  }
}


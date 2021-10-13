import { ref } from 'vue';
import {
  updateSysFeedback,
  getSysFeedbackPage,
  getSysFeedbackById,
  deleteSysFeedbackById,
} from '/@/api/sys/feedback';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n'

export default function useSysFeedbackRepository() {
  const { t } = useI18n()
  const formData = ref({})

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 修改
  const updateSysFeedbackHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      updateSysFeedback(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getSysFeedbackPage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 根据id获取数据
  const getSysFeedbackByIdHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      getSysFeedbackById(params).then((response: any) => {
        formData.value = response
        callback && callback()
        resolve(response)
      });
    })
  }

  // 删除
  const deleteSysFeedbackByIdHandle = (params: any, callback: any) => {
    ElMessageBox.confirm(t('table.deleteTipMessage'), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        deleteSysFeedbackById(params).then(() => {
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
    updateSysFeedbackHandle,
    getPageHandle,
    getSysFeedbackByIdHandle,
    deleteSysFeedbackByIdHandle,
  }
}


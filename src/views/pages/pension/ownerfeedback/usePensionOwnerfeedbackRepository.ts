import { ref } from 'vue';
import {
  createPensionOwnerfeedback,
  acceptPensionOwnerfeedbackById,
  completePensionOwnerfeedbackById,
  getPensionOwnerfeedbackPage,
  getPensionOwnerfeedbackById,
} from '/@/api/pension/ownerfeedback';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n'

export default function usePensionOwnerfeedbackRepository() {
  const { t } = useI18n()
  const formData = ref({})

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 后台补录业主反馈
  const createPensionOwnerfeedbackHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      createPensionOwnerfeedback(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 业主反馈确认
  const acceptPensionOwnerfeedbackByIdHandle = (params: any, callback: any) => {
    ElMessageBox.confirm(t('PensionOwnerfeedback.acceptTipMessage'), t('table.tips'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        acceptPensionOwnerfeedbackById(params).then(() => {
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


  // 业主反馈处理完毕
  const completePensionOwnerfeedbackByIdHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      completePensionOwnerfeedbackById(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getPensionOwnerfeedbackPage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 根据id获取数据
  const getPensionOwnerfeedbackByIdHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      getPensionOwnerfeedbackById(params).then((response: any) => {
        formData.value = response
        callback && callback()
        resolve(response)
      });
    })
  }

  return {
    formData,
    formPageResetHandle,
    createPensionOwnerfeedbackHandle,
    acceptPensionOwnerfeedbackByIdHandle,
    completePensionOwnerfeedbackByIdHandle,
    getPageHandle,
    getPensionOwnerfeedbackByIdHandle,
  }
}


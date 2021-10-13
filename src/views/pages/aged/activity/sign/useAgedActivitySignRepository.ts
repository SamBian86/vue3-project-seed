import { ref } from 'vue';
import {
  getAgedActivitySignPage,
  getAgedActivitySignById,
  deleteAgedActivitySignById,
} from '/@/api/aged/activity/sign';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n'

export default function useAgedActivitySignRepository() {
  const { t } = useI18n()
  const formData = ref({})

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getAgedActivitySignPage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 根据id获取数据
  const getAgedActivitySignByIdHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      getAgedActivitySignById(params).then((response: any) => {
        formData.value = response
        callback && callback()
        resolve(response)
      });
    })
  }

  // 删除
  const deleteAgedActivitySignByIdHandle = (params: any, callback: any) => {
    ElMessageBox.confirm(t('table.deleteTipMessage'), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        deleteAgedActivitySignById(params).then(() => {
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
    getPageHandle,
    getAgedActivitySignByIdHandle,
    deleteAgedActivitySignByIdHandle,
  }
}


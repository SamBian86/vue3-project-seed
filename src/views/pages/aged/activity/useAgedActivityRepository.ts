import { ref } from 'vue';
import {
  createAgedActivity,
  updateAgedActivity,
  getAgedActivitySignitem,
  getAgedActivityPage,
  exportAgedActivity,
  getAgedActivityById,
  deleteAgedActivityById,
} from '/@/api/aged/activity';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n'

export default function useAgedActivityRepository() {
  const { t } = useI18n()
  const formData = ref({})
  const agedActivitySignitem = ref([])

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 创建
  const createAgedActivityHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      createAgedActivity(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 修改
  const updateAgedActivityHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      updateAgedActivity(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 活动参与人员列表
  const getAgedActivitySignitemHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getAgedActivitySignitem(params).then((response: any) => {
        agedActivitySignitem.value = response
        resolve(response)
      });
    })
  }

  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getAgedActivityPage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 导出
  const exportHandle = (params: any) => {
    exportAgedActivity(params)
  }

  // 根据id获取数据
  const getAgedActivityByIdHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      getAgedActivityById(params).then((response: any) => {
        formData.value = response
        callback && callback()
        resolve(response)
      });
    })
  }

  // 删除
  const deleteAgedActivityByIdHandle = (params: any, callback: any) => {
    ElMessageBox.confirm(t('table.deleteTipMessage'), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        deleteAgedActivityById(params).then(() => {
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
    createAgedActivityHandle,
    updateAgedActivityHandle,
    agedActivitySignitem,
    getAgedActivitySignitemHandle,
    getPageHandle,
    exportHandle,
    getAgedActivityByIdHandle,
    deleteAgedActivityByIdHandle,
  }
}


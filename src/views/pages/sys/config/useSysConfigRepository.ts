import { ref } from 'vue';
import {
  createSysConfig,
  updateSysConfig,
  getSysConfigPage,
  getSysConfigById,
  deleteSysConfigById,
  deleteSysConfigBatch
} from '/@/api/sys/config';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n'

export default function useSysConfigRepository() {
  const { t } = useI18n()
  const formData = ref({})

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 创建
  const createSysConfigHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      createSysConfig(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 修改
  const updateSysConfigHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      updateSysConfig(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getSysConfigPage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 根据id获取数据
  const getSysConfigByIdHandle = (params: any, callback: any) => {
    getSysConfigById(params).then((response: any) => {
      formData.value = response
      callback && callback()
    });
  }

  // 批量删除
  const deleteSysConfigBatchHandle = (params: any, callback: any) => {
    ElMessageBox.confirm(t('table.deleteTipMessage'), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        deleteSysConfigBatch(params).then(() => {
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

  // 删除
  const deleteSysConfigByIdHandle = (params: any, callback: any) => {
    ElMessageBox.confirm(t('table.deleteTipMessage'), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        deleteSysConfigById(params).then(() => {
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
    createSysConfigHandle,
    updateSysConfigHandle,
    getPageHandle,
    getSysConfigByIdHandle,
    deleteSysConfigBatchHandle,
    deleteSysConfigByIdHandle,
  }
}


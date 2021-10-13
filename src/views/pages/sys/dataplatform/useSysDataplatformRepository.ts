import { ref } from 'vue';
import {
  createSysDataplatform,
  updateSysDataplatform,
  getSysDataplatformPage,
  getSysDataplatformById,
  deleteSysDataplatformById,
} from '/@/api/sys/dataplatform';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n'

export default function useSysDataplatformRepository() {
  const { t } = useI18n()
  const formData = ref({})

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 创建
  const createSysDataplatformHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      createSysDataplatform(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 修改
  const updateSysDataplatformHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      updateSysDataplatform(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getSysDataplatformPage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 根据id获取数据
  const getSysDataplatformByIdHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      getSysDataplatformById(params).then((response: any) => {
        formData.value = response
        callback && callback()
        resolve(response)
      });
    })
  }

  // 删除
  const deleteSysDataplatformByIdHandle = (params: any, callback: any) => {
    ElMessageBox.confirm(t('table.deleteTipMessage'), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        deleteSysDataplatformById(params).then(() => {
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
    createSysDataplatformHandle,
    updateSysDataplatformHandle,
    getPageHandle,
    getSysDataplatformByIdHandle,
    deleteSysDataplatformByIdHandle,
  }
}


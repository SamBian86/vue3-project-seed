import { ref } from 'vue';
import {
  createSysBusinessserverarealink,
  getSysBusinessserverarealinkListAll,
  deleteSysBusinessserverarealinkById,
} from '/@/api/sys/businessserverarealink';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n'

export default function useSysBusinessserverarealinkRepository() {
  const { t } = useI18n()
  const formData = ref({})
  const sysBusinessserverarealinkListAll = ref([])

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 创建
  const createSysBusinessserverarealinkHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      createSysBusinessserverarealink(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 获取列表数据
  const getSysBusinessserverarealinkListAllHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getSysBusinessserverarealinkListAll(params).then((response: any) => {
        sysBusinessserverarealinkListAll.value = response
        resolve(response)
      });
    })
  }

  // 删除
  const deleteSysBusinessserverarealinkByIdHandle = (params: any, callback: any) => {
    ElMessageBox.confirm(t('table.deleteTipMessage'), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        deleteSysBusinessserverarealinkById(params).then(() => {
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
    createSysBusinessserverarealinkHandle,
    sysBusinessserverarealinkListAll,
    getSysBusinessserverarealinkListAllHandle,
    deleteSysBusinessserverarealinkByIdHandle,
  }
}


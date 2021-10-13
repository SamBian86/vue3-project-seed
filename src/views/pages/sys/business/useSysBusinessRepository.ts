import { ref } from 'vue';
import {
  createSysBusiness,
  updateSysBusiness,
  getSysBusinessListAll,
  getSysBusinessListPull,
  getSysBusinessPage,
  getSysBusinessById,
  deleteSysBusinessById,
} from '/@/api/sys/business';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n'

export default function useSysBusinessRepository() {
  const { t } = useI18n()
  const formData = ref({})
  const sysBusinessListAll = ref([])
  const sysBusinessListPull = ref([])

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 创建
  const createSysBusinessHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      createSysBusiness(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 修改
  const updateSysBusinessHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      updateSysBusiness(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 获取列表数据
  const getSysBusinessListAllHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getSysBusinessListAll(params).then((response: any) => {
        sysBusinessListAll.value = response
        resolve(response)
      });
    })
  }

  // 商家下拉列表
  const getSysBusinessListPullHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getSysBusinessListPull(params).then((response: any) => {
        sysBusinessListPull.value = response
        resolve(response)
      });
    })
  }

  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getSysBusinessPage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 根据id获取数据
  const getSysBusinessByIdHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      getSysBusinessById(params).then((response: any) => {
        formData.value = response
        callback && callback()
        resolve(response)
      });
    })
  }

  // 删除
  const deleteSysBusinessByIdHandle = (params: any, callback: any) => {
    ElMessageBox.confirm(t('table.deleteTipMessage'), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        deleteSysBusinessById(params).then(() => {
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
    createSysBusinessHandle,
    updateSysBusinessHandle,
    sysBusinessListAll,
    getSysBusinessListAllHandle,
    sysBusinessListPull,
    getSysBusinessListPullHandle,
    getPageHandle,
    getSysBusinessByIdHandle,
    deleteSysBusinessByIdHandle,
  }
}


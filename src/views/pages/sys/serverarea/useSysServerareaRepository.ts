import { ref } from 'vue';
import {
  createSysServerarea,
  updateSysServerarea,
  getSysServerareaList,
  getSysServerareaSelect,
  getSysServerareaPage,
  getSysServerareaById,
  deleteSysServerareaById
} from '/@/api/sys/serverarea';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n'

export default function useSysServerareaRepository() {
  const { t } = useI18n()
  const formData = ref({})
  const sysServerareaList = ref([])
  const sysServerareaSelect = ref([])

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 创建
  const createSysServerareaHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      createSysServerarea(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 修改
  const updateSysServerareaHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      updateSysServerarea(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 获取列表数据
  const getSysServerareaListHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getSysServerareaList(params).then((response: any) => {
        sysServerareaList.value = response
        resolve(response)
      });
    })
  }

  // 下拉选择框
  const getSysServerareaSelectHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getSysServerareaSelect(params).then((response: any) => {
        sysServerareaSelect.value = response
        resolve(response)
      });
    })
  }

  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getSysServerareaPage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 根据id获取数据
  const getSysServerareaByIdHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      getSysServerareaById(params).then((response: any) => {
        formData.value = response
        callback && callback()
        resolve(response)
      });
    })
  }

  // 删除
  const deleteSysServerareaByIdHandle = (params: any, callback: any) => {
    ElMessageBox.confirm(t('table.deleteTipMessage'), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        deleteSysServerareaById(params).then(() => {
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
    createSysServerareaHandle,
    updateSysServerareaHandle,
    sysServerareaList,
    getSysServerareaListHandle,
    sysServerareaSelect,
    getSysServerareaSelectHandle,
    getPageHandle,
    getSysServerareaByIdHandle,
    deleteSysServerareaByIdHandle,
  }
}


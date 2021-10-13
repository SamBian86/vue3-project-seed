import { ref } from 'vue';
import {
  createSysTag,
  updateSysTag,
  getSysTagListAll,
  getSysTagPage,
  getSysTagById,
  deleteSysTagById,
} from '/@/api/sys/tag';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n'

export default function useSysTagRepository() {
  const { t } = useI18n()
  const formData = ref({})
  const sysTagListAll = ref([])

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 创建
  const createSysTagHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      createSysTag(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 修改
  const updateSysTagHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      updateSysTag(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 获取列表数据
  const getSysTagListAllHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getSysTagListAll(params).then((response: any) => {
        sysTagListAll.value = response
        resolve(response)
      });
    })
  }


  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getSysTagPage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 根据id获取数据
  const getSysTagByIdHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      getSysTagById(params).then((response: any) => {
        formData.value = response
        callback && callback()
        resolve(response)
      });
    })
  }

  // 删除
  const deleteSysTagByIdHandle = (params: any, callback: any) => {
    ElMessageBox.confirm(t('table.deleteTipMessage'), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        deleteSysTagById(params).then(() => {
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
    createSysTagHandle,
    updateSysTagHandle,
    sysTagListAll,
    getSysTagListAllHandle,
    getPageHandle,
    getSysTagByIdHandle,
    deleteSysTagByIdHandle,
  }
}


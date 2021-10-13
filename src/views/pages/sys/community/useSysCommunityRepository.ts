import { ref } from 'vue';
import {
  createSysCommunity,
  updateSysCommunity,
  getSysCommunityListAll,
  getSysCommunityPage,
  getSysCommunityById,
  deleteSysCommunityById,
} from '/@/api/sys/community';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n'

export default function useSysCommunityRepository() {
  const { t } = useI18n()
  const formData = ref({})
  const sysCommunityListAll = ref([])

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 创建
  const createSysCommunityHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      createSysCommunity(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 修改
  const updateSysCommunityHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      updateSysCommunity(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 获取列表数据
  const getSysCommunityListAllHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getSysCommunityListAll(params).then((response: any) => {
        sysCommunityListAll.value = response
        resolve(response)
      });
    })
  }

  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getSysCommunityPage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 根据id获取数据
  const getSysCommunityByIdHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      getSysCommunityById(params).then((response: any) => {
        formData.value = response
        callback && callback()
        resolve(response)
      });
    })
  }

  // 删除
  const deleteSysCommunityByIdHandle = (params: any, callback: any) => {
    ElMessageBox.confirm(t('table.deleteTipMessage'), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        deleteSysCommunityById(params).then(() => {
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
    createSysCommunityHandle,
    updateSysCommunityHandle,
    sysCommunityListAll,
    getSysCommunityListAllHandle,
    getPageHandle,
    getSysCommunityByIdHandle,
    deleteSysCommunityByIdHandle,
  }
}


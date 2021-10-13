import { ref } from 'vue';
import {
  createPensionServer,
  updatePensionServer,
  getPensionServerListAll,
  getPensionServerGroup,
  getPensionServerListPullById,
  getPensionServerPage,
  getPensionServerNameList,
  getPensionServerById,
  deletePensionServerById,
  displayPensionServer,
} from '/@/api/pension/server';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n'

export default function usePensionServerRepository() {
  const { t } = useI18n()
  const formData = ref({})
  const pensionServerListAll = ref([])
  const pensionServerGroup = ref([])
  const pensionServerListPull = ref([])
  const pensionServerNameList = ref([])

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 创建
  const createPensionServerHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      createPensionServer(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 修改
  const updatePensionServerHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      updatePensionServer(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 获取列表数据
  const getPensionServerListAllHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getPensionServerListAll(params).then((response: any) => {
        pensionServerListAll.value = response
        resolve(response)
      });
    })
  }

  // 查询分组服务列表
  const getPensionServerGroupHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getPensionServerGroup(params).then((response: any) => {
        pensionServerGroup.value = response
        resolve(response)
      });
    })
  }

  // 获取服务下拉列表
  const getPensionServerListPullByIdHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getPensionServerListPullById(params).then((response: any) => {
        pensionServerListPull.value = response
        resolve(response)
      });
    })
  }

  // 查询所有服务
  const getPensionServerNameListHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getPensionServerNameList(params).then((response: any) => {
        pensionServerNameList.value = response
        resolve(response)
      });
    })
  }

  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getPensionServerPage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 根据id获取数据
  const getPensionServerByIdHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      getPensionServerById(params).then((response: any) => {
        formData.value = response
        callback && callback()
        resolve(response)
      });
    })
  }

  // 删除
  const deletePensionServerByIdHandle = (params: any, callback: any) => {
    ElMessageBox.confirm(t('table.deleteTipMessage'), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        deletePensionServerById(params).then(() => {
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

  // 上/下架
  const displayPensionServerHandle = (params: any, callback: any) => {
    const { display } = params
    ElMessageBox.confirm(display === 1 ? t('table.onTipMessage') : t('table.offTipMessage'), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        displayPensionServer(params).then(() => {
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

  return {
    formData,
    formPageResetHandle,
    createPensionServerHandle,
    updatePensionServerHandle,
    pensionServerListAll,
    getPensionServerListAllHandle,
    pensionServerGroup,
    getPensionServerGroupHandle,
    pensionServerListPull,
    getPensionServerListPullByIdHandle,
    pensionServerNameList,
    getPensionServerNameListHandle,
    getPageHandle,
    getPensionServerByIdHandle,
    deletePensionServerByIdHandle,
    displayPensionServerHandle,
  }
}


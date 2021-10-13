import { ref } from 'vue';
import {
  createHouseReplacementinfo,
  updateHouseReplacementinfo,
  getHouseReplacementinfoListAll,
  getHouseReplacementinfoCommunitiesPage,
  getHouseReplacementinfoPage,
  getHouseReplacementinfoById,
  deleteHouseReplacementinfoById,
  unboundHouseReplacementinfoById,
  boundHouseReplacementinfoById,
  getHouseReplacementinfoCommunitiesById
} from '/@/api/house/replacementinfo';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n'

export default function useHouseReplacementinfoRepository() {
  const { t } = useI18n()
  const formData = ref({})
  const houseReplacementinfoListAll = ref([])
  const houseReplacementinfoCommunities = ref([])

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 创建
  const createHouseReplacementinfoHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      createHouseReplacementinfo(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 修改
  const updateHouseReplacementinfoHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      updateHouseReplacementinfo(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 获取列表数据
  const getHouseReplacementinfoListAllHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getHouseReplacementinfoListAll(params).then((response: any) => {
        houseReplacementinfoListAll.value = response
        resolve(response)
      });
    })
  }

  // 获取所有未绑定社区
  const getHouseReplacementinfoCommunitiesPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getHouseReplacementinfoCommunitiesPage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getHouseReplacementinfoPage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 根据id获取数据
  const getHouseReplacementinfoByIdHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      getHouseReplacementinfoById(params).then((response: any) => {
        formData.value = response
        callback && callback()
        resolve(response)
      });
    })
  }

  // 删除
  const deleteHouseReplacementinfoByIdHandle = (params: any, callback: any) => {
    ElMessageBox.confirm(t('table.deleteTipMessage'), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        deleteHouseReplacementinfoById(params).then(() => {
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

  // 社区解绑
  const unboundHouseReplacementinfoByIdHandle = (params: any, callback: any) => {
    ElMessageBox.confirm(t('HouseReplacementinfo.unBoundTipMessage', { communityName: params.communityName }), t('global.tips'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        unboundHouseReplacementinfoById(params).then(() => {
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

  // 绑定社区
  const boundHouseReplacementinfoByIdHandle = (params: any, callback: any) => {
    ElMessageBox.confirm(t('HouseReplacementinfo.boundTipMessage', { name: params.name }), t('global.tips'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        boundHouseReplacementinfoById(params).then(() => {
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

  // 获取当前租售中心绑定社区列表
  const getHouseReplacementinfoCommunitiesByIdHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getHouseReplacementinfoCommunitiesById(params).then((response: any) => {
        houseReplacementinfoCommunities.value = response
        resolve(response)
      });
    })
  }

  return {
    formData,
    formPageResetHandle,
    createHouseReplacementinfoHandle,
    updateHouseReplacementinfoHandle,
    houseReplacementinfoListAll,
    getHouseReplacementinfoListAllHandle,
    getHouseReplacementinfoCommunitiesPageHandle,
    getPageHandle,
    getHouseReplacementinfoByIdHandle,
    deleteHouseReplacementinfoByIdHandle,
    unboundHouseReplacementinfoByIdHandle,
    boundHouseReplacementinfoByIdHandle,
    houseReplacementinfoCommunities,
    getHouseReplacementinfoCommunitiesByIdHandle
  }
}


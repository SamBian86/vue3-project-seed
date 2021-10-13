import { ref } from 'vue';
import {
  createVolunteerExchangeserver,
  updateVolunteerExchangeserver,
  getVolunteerExchangeserverListAll,
  getVolunteerExchangeserverPage,
  getVolunteerExchangeserverById,
  deleteVolunteerExchangeserverById,
  displayVolunteerExchangeserver,
} from '/@/api/volunteer/exchangeserver';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n'

export default function useVolunteerExchangeserverRepository() {
  const { t } = useI18n()
  const formData = ref({})
  const volunteerExchangeserverListAll = ref([])

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 创建
  const createVolunteerExchangeserverHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      createVolunteerExchangeserver(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 修改
  const updateVolunteerExchangeserverHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      updateVolunteerExchangeserver(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 获取列表数据
  const getVolunteerExchangeserverListAllHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getVolunteerExchangeserverListAll(params).then((response: any) => {
        volunteerExchangeserverListAll.value = response
        resolve(response)
      });
    })
  }

  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getVolunteerExchangeserverPage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 根据id获取数据
  const getVolunteerExchangeserverByIdHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      getVolunteerExchangeserverById(params).then((response: any) => {
        formData.value = response
        callback && callback()
        resolve(response)
      });
    })
  }

  // 删除
  const deleteVolunteerExchangeserverByIdHandle = (params: any, callback: any) => {
    ElMessageBox.confirm(t('table.deleteTipMessage'), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        deleteVolunteerExchangeserverById(params).then(() => {
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
  const displayVolunteerExchangeserverHandle = (params: any, callback: any) => {
    const { isdisplay } = params
    ElMessageBox.confirm(isdisplay === 1 ? t('table.onTipMessage') : t('table.offTipMessage'), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        displayVolunteerExchangeserver(params).then(() => {
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
    createVolunteerExchangeserverHandle,
    updateVolunteerExchangeserverHandle,
    volunteerExchangeserverListAll,
    getVolunteerExchangeserverListAllHandle,
    getPageHandle,
    getVolunteerExchangeserverByIdHandle,
    deleteVolunteerExchangeserverByIdHandle,
    displayVolunteerExchangeserverHandle,
  }
}


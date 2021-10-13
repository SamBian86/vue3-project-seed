import { ref } from 'vue';
import {
  createVolunteerExchangeproduct,
  updateVolunteerExchangeproduct,
  getVolunteerExchangeproductListAll,
  getVolunteerExchangeproductPage,
  getVolunteerExchangeproductById,
  deleteVolunteerExchangeproductById,
  displayVolunteerExchangeproduct,
} from '/@/api/volunteer/exchangeproduct';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n'

export default function useVolunteerExchangeproductRepository() {
  const { t } = useI18n()
  const formData = ref({})
  const volunteerExchangeproductListAll = ref([])

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 创建
  const createVolunteerExchangeproductHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      createVolunteerExchangeproduct(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 修改
  const updateVolunteerExchangeproductHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      updateVolunteerExchangeproduct(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 获取列表数据
  const getVolunteerExchangeproductListAllHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getVolunteerExchangeproductListAll(params).then((response: any) => {
        volunteerExchangeproductListAll.value = response
        resolve(response)
      });
    })
  }

  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getVolunteerExchangeproductPage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 根据id获取数据
  const getVolunteerExchangeproductByIdHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      getVolunteerExchangeproductById(params).then((response: any) => {
        formData.value = response
        callback && callback()
        resolve(response)
      });
    })
  }

  // 删除
  const deleteVolunteerExchangeproductByIdHandle = (params: any, callback: any) => {
    ElMessageBox.confirm(t('table.deleteTipMessage'), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        deleteVolunteerExchangeproductById(params).then(() => {
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
  const displayVolunteerExchangeproductHandle = (params: any, callback: any) => {
    const { isdisplay } = params
    ElMessageBox.confirm(isdisplay === 1 ? t('table.onTipMessage') : t('table.offTipMessage'), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        displayVolunteerExchangeproduct(params).then(() => {
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
    createVolunteerExchangeproductHandle,
    updateVolunteerExchangeproductHandle,
    volunteerExchangeproductListAll,
    getVolunteerExchangeproductListAllHandle,
    getPageHandle,
    getVolunteerExchangeproductByIdHandle,
    deleteVolunteerExchangeproductByIdHandle,
    displayVolunteerExchangeproductHandle,
  }
}


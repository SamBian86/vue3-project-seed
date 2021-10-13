import { ref } from 'vue';
import {
  createAgedLinkaddress,
  updateAgedLinkaddress,
  getAgedLinkaddressPage,
  getAgedLinkaddressDelivery,
  getAgedLinkaddressById,
  deleteAgedLinkaddressById
} from '/@/api/aged/linkaddress';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n'

export default function useAgedLinkaddressRepository() {
  const { t } = useI18n()
  const formData = ref({})
  const agedLinkaddressDelivery = ref([])

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 创建
  const createAgedLinkaddressHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      createAgedLinkaddress(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 修改
  const updateAgedLinkaddressHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      updateAgedLinkaddress(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 服务地址列表查询-改为只针对前端用户
  const getAgedLinkaddressDeliveryHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getAgedLinkaddressDelivery(params).then((response: any) => {
        agedLinkaddressDelivery.value = response
        resolve(response)
      });
    })
  }


  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getAgedLinkaddressPage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 根据id获取数据
  const getAgedLinkaddressByIdHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      getAgedLinkaddressById(params).then((response: any) => {
        formData.value = response
        callback && callback()
        resolve(response)
      });
    })
  }

  // 删除
  const deleteAgedLinkaddressByIdHandle = (params: any, callback: any) => {
    ElMessageBox.confirm(t('table.deleteTipMessage'), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        deleteAgedLinkaddressById(params).then(() => {
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
    createAgedLinkaddressHandle,
    updateAgedLinkaddressHandle,
    agedLinkaddressDelivery,
    getAgedLinkaddressDeliveryHandle,
    getPageHandle,
    getAgedLinkaddressByIdHandle,
    deleteAgedLinkaddressByIdHandle,
  }
}


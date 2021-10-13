import { ref } from 'vue';
import {
  createPensionServerdiscountdetail,
  updatePensionServerdiscountdetail,
  getPensionServerdiscountdetailListAll,
  getPensionServerdiscountdetailOrder,
  getPensionServerdiscountdetailPage,
  getPensionServerdiscountdetailById,
  deletePensionServerdiscountdetailById,
} from '/@/api/pension/serverdiscountdetail';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n'

export default function usePensionServerdiscountdetailRepository() {
  const { t } = useI18n()
  const formData = ref({})
  const pensionServerdiscountdetailListAll = ref([])
  const pensionServerdiscountdetailOrder = ref([])

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 创建
  const createPensionServerdiscountdetailHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      createPensionServerdiscountdetail(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 修改
  const updatePensionServerdiscountdetailHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      updatePensionServerdiscountdetail(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 获取列表数据
  const getPensionServerdiscountdetailListAllHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getPensionServerdiscountdetailListAll(params).then((response: any) => {
        pensionServerdiscountdetailListAll.value = response
        resolve(response)
      });
    })
  }

  // 后台下单查询服务折扣
  const getPensionServerdiscountdetailOrderHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getPensionServerdiscountdetailOrder(params).then((response: any) => {
        pensionServerdiscountdetailOrder.value = response
        resolve(response)
      });
    })
  }

  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getPensionServerdiscountdetailPage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 根据id获取数据
  const getPensionServerdiscountdetailByIdHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      getPensionServerdiscountdetailById(params).then((response: any) => {
        formData.value = response
        callback && callback()
        resolve(response)
      });
    })
  }

  // 删除
  const deletePensionServerdiscountdetailByIdHandle = (params: any, callback: any) => {
    ElMessageBox.confirm(t('table.deleteTipMessage'), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        deletePensionServerdiscountdetailById(params).then(() => {
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
    createPensionServerdiscountdetailHandle,
    updatePensionServerdiscountdetailHandle,
    pensionServerdiscountdetailListAll,
    getPensionServerdiscountdetailListAllHandle,
    pensionServerdiscountdetailOrder,
    getPensionServerdiscountdetailOrderHandle,
    getPageHandle,
    getPensionServerdiscountdetailByIdHandle,
    deletePensionServerdiscountdetailByIdHandle,
  }
}


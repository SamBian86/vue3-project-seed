import { ref } from 'vue';
import {
  createSysBannerinfo,
  updateSysBannerinfo,
  getSysBannerinfoPage,
  getSysBannerinfoById,
  deleteSysBannerinfoById,
  getSysBannerinfoOperation,
  getSysBannerinfoOperationServerarea,
  displaySysBannerinfo,
  exchangeSysBannerinfo
} from '/@/api/sys/bannerinfo';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n'

export default function useSysBannerinfoRepository() {
  const { t } = useI18n()
  const formData = ref({})
  const sysBannerinfoOperation = ref([])
  const sysBannerinfoOperationServerarea = ref([])

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 创建
  const createSysBannerinfoHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      createSysBannerinfo(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getSysBannerinfoPage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 修改
  const updateSysBannerinfoHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      updateSysBannerinfo(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 根据id获取数据
  const getSysBannerinfoByIdHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      getSysBannerinfoById(params).then((response: any) => {
        formData.value = response
        callback && callback()
        return resolve(response)
      });
    })
  }

  // 删除
  const deleteSysBannerinfoByIdHandle = (params: any, callback: any) => {
    ElMessageBox.confirm(t('table.deleteTipMessage'), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        deleteSysBannerinfoById(params).then(() => {
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

  // 查询关联内容列表信息
  const getSysBannerinfoOperationHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getSysBannerinfoOperation(params).then((response: any) => {
        sysBannerinfoOperation.value = response
        resolve(response)
      });
    })
  }

  // 查询内容所属区域
  const getSysBannerinfoOperationServerareaHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getSysBannerinfoOperationServerarea(params).then((response: any) => {
        sysBannerinfoOperationServerarea.value = response
        resolve(response)
      });
    })
  }

  // 上/下架
  const displaySysBannerinfoHandle = (params: any, callback: any) => {
    const { isdisplay } = params
    ElMessageBox.confirm(isdisplay === 1 ? t('table.onTipMessage') : t('table.offTipMessage'), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        displaySysBannerinfo(params).then(() => {
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

  // 显示次序更替
  const exchangeSysBannerinfoHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      exchangeSysBannerinfo(params).then((response: any) => {
        callback && callback()
        return resolve(response)
      });
    })
  }

  return {
    formData,
    formPageResetHandle,
    createSysBannerinfoHandle,
    updateSysBannerinfoHandle,
    getPageHandle,
    getSysBannerinfoByIdHandle,
    deleteSysBannerinfoByIdHandle,
    sysBannerinfoOperation,
    getSysBannerinfoOperationHandle,
    sysBannerinfoOperationServerarea,
    getSysBannerinfoOperationServerareaHandle,
    displaySysBannerinfoHandle,
    exchangeSysBannerinfoHandle
  }
}


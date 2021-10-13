import { ref } from 'vue';
import {
  createSysFunctioninfo,
  updateSysFunctioninfo,
  getSysFunctioninfoPage,
  getSysFunctioninfoById,
  deleteSysFunctioninfoById,
  displaySysFunctioninfo,
  exchangeSysFunctioninfo
} from '/@/api/sys/functioninfo';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n'

export default function useSysFunctioninfoRepository() {
  const { t } = useI18n()
  const formData = ref({})

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 创建
  const createSysFunctioninfoHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      createSysFunctioninfo(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 修改
  const updateSysFunctioninfoHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      updateSysFunctioninfo(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getSysFunctioninfoPage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 根据id获取数据
  const getSysFunctioninfoByIdHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      getSysFunctioninfoById(params).then((response: any) => {
        formData.value = response
        callback && callback()
        resolve(response)
      });
    })
  }

  // 删除
  const deleteSysFunctioninfoByIdHandle = (params: any, callback: any) => {
    ElMessageBox.confirm(t('table.deleteTipMessage'), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        deleteSysFunctioninfoById(params).then(() => {
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
  const displaySysFunctioninfoHandle = (params: any, callback: any) => {
    const { isdisplay } = params
    ElMessageBox.confirm(isdisplay === 1 ? t('table.onTipMessage') : t('table.offTipMessage'), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        displaySysFunctioninfo(params).then(() => {
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
  const exchangeSysFunctioninfoHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      exchangeSysFunctioninfo(params).then((response: any) => {
        callback && callback()
        return resolve(response)
      });
    })
  }

  return {
    formData,
    formPageResetHandle,
    createSysFunctioninfoHandle,
    updateSysFunctioninfoHandle,
    getPageHandle,
    getSysFunctioninfoByIdHandle,
    deleteSysFunctioninfoByIdHandle,
    displaySysFunctioninfoHandle,
    exchangeSysFunctioninfoHandle
  }
}


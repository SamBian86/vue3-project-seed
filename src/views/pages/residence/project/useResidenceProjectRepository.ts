import { ref } from 'vue';
import {
  createResidenceProject,
  updateResidenceProject,
  getResidenceProjectPage,
  getResidenceProjectById,
  deleteResidenceProjectById,
  displayResidenceProject,
} from '/@/api/residence/project';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n'

export default function useResidenceProjectRepository() {
  const { t } = useI18n()
  const formData = ref({})

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 创建
  const createResidenceProjectHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      createResidenceProject(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 修改
  const updateResidenceProjectHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      updateResidenceProject(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getResidenceProjectPage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 根据id获取数据
  const getResidenceProjectByIdHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      getResidenceProjectById(params).then((response: any) => {
        formData.value = response
        callback && callback()
        resolve(response)
      });
    })
  }

  // 删除
  const deleteResidenceProjectByIdHandle = (params: any, callback: any) => {
    ElMessageBox.confirm(t('table.deleteTipMessage'), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        deleteResidenceProjectById(params).then(() => {
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
  const displayResidenceProjectHandle = (params: any, callback: any) => {
    const { isdisplay } = params
    ElMessageBox.confirm(isdisplay === 1 ? t('table.onTipMessage') : t('table.offTipMessage'), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        displayResidenceProject(params).then(() => {
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
    createResidenceProjectHandle,
    updateResidenceProjectHandle,
    getPageHandle,
    getResidenceProjectByIdHandle,
    deleteResidenceProjectByIdHandle,
    displayResidenceProjectHandle,
  }
}


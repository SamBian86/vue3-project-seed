import { ref } from 'vue';
import {
  createPensionArticle,
  updatePensionArticle,
  getPensionArticlePage,
  getPensionArticleById,
  deletePensionArticleById,
  displayPensionArticle,
} from '/@/api/pension/article';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n'

export default function usePensionArticleRepository() {
  const { t } = useI18n()
  const formData = ref({})

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 创建
  const createPensionArticleHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      createPensionArticle(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 修改
  const updatePensionArticleHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      updatePensionArticle(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getPensionArticlePage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 根据id获取数据
  const getPensionArticleByIdHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      getPensionArticleById(params).then((response: any) => {
        formData.value = response
        callback && callback()
        resolve(response)
      });
    })
  }

  // 删除
  const deletePensionArticleByIdHandle = (params: any, callback: any) => {
    ElMessageBox.confirm(t('table.deleteTipMessage'), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        deletePensionArticleById(params).then(() => {
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
  const displayPensionArticleHandle = (params: any, callback: any) => {
    const { display } = params
    ElMessageBox.confirm(display === 1 ? t('table.onTipMessage') : t('table.offTipMessage'), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        displayPensionArticle(params).then(() => {
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
    createPensionArticleHandle,
    updatePensionArticleHandle,
    getPageHandle,
    getPensionArticleByIdHandle,
    deletePensionArticleByIdHandle,
    displayPensionArticleHandle,
  }
}


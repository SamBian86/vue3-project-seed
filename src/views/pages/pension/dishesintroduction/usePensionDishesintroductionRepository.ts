import { ref } from 'vue';
import {
  createPensionDishesintroduction,
  updatePensionDishesintroduction,
  getPensionDishesintroductionServerAreas,
  getPensionDishesintroductionPage,
  getPensionDishesintroductionById,
  deletePensionDishesintroductionById,
  detailsPensionDishesintroduction,
  mealdetailsPensionDishesintroduction,
  orderlinkPensionDishesintroduction
} from '/@/api/pension/dishesintroduction';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n'

export default function usePensionDishesintroductionRepository() {
  const { t } = useI18n()
  const formData = ref({})

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 创建
  const createPensionDishesintroductionHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      createPensionDishesintroduction(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 修改
  const updatePensionDishesintroductionHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      updatePensionDishesintroduction(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 获取列表数据
  const getPensionDishesintroductionServerAreasHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getPensionDishesintroductionServerAreas(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getPensionDishesintroductionPage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 根据id获取数据
  const getPensionDishesintroductionByIdHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      getPensionDishesintroductionById(params).then((response: any) => {
        formData.value = response
        callback && callback()
        resolve(response)
      });
    })
  }

  // 删除
  const deletePensionDishesintroductionByIdHandle = (params: any, callback: any) => {
    ElMessageBox.confirm(t('table.deleteTipMessage'), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        deletePensionDishesintroductionById(params).then(() => {
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

  // 菜单富文本编辑
  const detailsPensionDishesintroductionHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      detailsPensionDishesintroduction(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 套餐富文本编辑
  const mealdetailsPensionDishesintroductionHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      mealdetailsPensionDishesintroduction(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 套餐富文本编辑
  const orderlinkPensionDishesintroductionHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      orderlinkPensionDishesintroduction(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  return {
    formData,
    formPageResetHandle,
    createPensionDishesintroductionHandle,
    updatePensionDishesintroductionHandle,
    getPensionDishesintroductionServerAreasHandle,
    getPageHandle,
    getPensionDishesintroductionByIdHandle,
    deletePensionDishesintroductionByIdHandle,
    detailsPensionDishesintroductionHandle,
    mealdetailsPensionDishesintroductionHandle,
    orderlinkPensionDishesintroductionHandle
  }
}


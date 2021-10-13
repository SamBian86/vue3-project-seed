import { ref } from 'vue';
import {
  createVolunteerRule,
  updateVolunteerRule,
  getVolunteerRulePage,
  getVolunteerRuleById,
  deleteVolunteerRuleById,
} from '/@/api/volunteer/rule';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n'

export default function useVolunteerRuleRepository() {
  const { t } = useI18n()
  const formData = ref({})

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 创建
  const createVolunteerRuleHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      createVolunteerRule(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 修改
  const updateVolunteerRuleHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      updateVolunteerRule(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getVolunteerRulePage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 根据id获取数据
  const getVolunteerRuleByIdHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      getVolunteerRuleById(params).then((response: any) => {
        formData.value = response
        callback && callback()
        resolve(response)
      });
    })
  }

  // 删除
  const deleteVolunteerRuleByIdHandle = (params: any, callback: any) => {
    ElMessageBox.confirm(t('table.deleteTipMessage'), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        deleteVolunteerRuleById(params).then(() => {
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
    createVolunteerRuleHandle,
    updateVolunteerRuleHandle,
    getPageHandle,
    getVolunteerRuleByIdHandle,
    deleteVolunteerRuleByIdHandle,
  }
}


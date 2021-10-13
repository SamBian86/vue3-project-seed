import { ref } from 'vue';
import {
  createPensionEmployee,
  getPensionEmployeeLabelByType,
  updatePensionEmployee,
  getPensionEmployeeList,
  getPensionEmployeeScoreList,
  getPensionEmployeeStaffList,
  getPensionEmployeePage,
  getPensionEmployeeById,
  deletePensionEmployeeById
} from '/@/api/pension/employee';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n'

export default function usePensionEmployeeRepository() {
  const { t } = useI18n()
  const formData = ref({})
  const pensionEmployeeLabel = ref([])
  const pensionEmployeeList = ref([])
  const pensionEmployeeScoreList = ref([])
  const pensionEmployeeStaffList = ref([])

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 创建
  const createPensionEmployeeHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      createPensionEmployee(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 获取员工各类标签
  const getPensionEmployeeLabelByTypeHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getPensionEmployeeLabelByType(params).then((response: any) => {
        pensionEmployeeLabel.value = response
        resolve(response)
      });
    })
  }

  // 修改
  const updatePensionEmployeeHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      updatePensionEmployee(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 获取列表数据
  const getPensionEmployeeListHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getPensionEmployeeList(params).then((response: any) => {
        pensionEmployeeList.value = response
        resolve(response)
      });
    })
  }

  // 用户评分列表
  const getPensionEmployeeScoreListHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getPensionEmployeeScoreList(params).then((response: any) => {
        pensionEmployeeScoreList.value = response
        resolve(response)
      });
    })
  }

  // 派单员工列表
  const getPensionEmployeeStaffListHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getPensionEmployeeStaffList(params).then((response: any) => {
        pensionEmployeeStaffList.value = response
        resolve(response)
      });
    })
  }

  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getPensionEmployeePage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 根据id获取数据
  const getPensionEmployeeByIdHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      getPensionEmployeeById(params).then((response: any) => {
        formData.value = response
        callback && callback()
        resolve(response)
      });
    })
  }

  // 上传
  const uploadPensionEmployeeHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      uploadPensionEmployee(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 删除
  const deletePensionEmployeeByIdHandle = (params: any, callback: any) => {
    ElMessageBox.confirm(t('table.deleteTipMessage'), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        deletePensionEmployeeById(params).then(() => {
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
    createPensionEmployeeHandle,
    pensionEmployeeLabel,
    getPensionEmployeeLabelByTypeHandle,
    updatePensionEmployeeHandle,
    pensionEmployeeList,
    getPensionEmployeeListHandle,
    pensionEmployeeScoreList,
    getPensionEmployeeScoreListHandle,
    pensionEmployeeStaffList,
    getPensionEmployeeStaffListHandle,
    getPageHandle,
    getPensionEmployeeByIdHandle,
    deletePensionEmployeeByIdHandle,
  }
}


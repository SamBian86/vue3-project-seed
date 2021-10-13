import { ref } from 'vue';
import {
  createHospitaldepartmentInfo,
  updateHospitaldepartmentInfo,
  updateHospitaldepartmentInfoIntroduceById,
  getHospitaldepartmentInfoPage,
  deleteHospitaldepartmentInfoById,
  exchangeHospitaldepartmentInfo
} from '/@/api/hospitaldepartment/info';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n'

export default function useHospitaldepartmentInfoRepository() {
  const { t } = useI18n()
  const formData = ref({})

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 创建
  const createHospitaldepartmentInfoHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      createHospitaldepartmentInfo(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 修改
  const updateHospitaldepartmentInfoHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      updateHospitaldepartmentInfo(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 添加/修改科室介绍
  const updateHospitaldepartmentInfoIntroduceByIdHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      updateHospitaldepartmentInfoIntroduceById(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getHospitaldepartmentInfoPage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 删除
  const deleteHospitaldepartmentInfoByIdHandle = (params: any, callback: any) => {
    ElMessageBox.confirm(t('table.deleteTipMessage'), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        deleteHospitaldepartmentInfoById(params).then(() => {
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

  // 显示次序更替
  const exchangeHospitaldepartmentInfoHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      exchangeHospitaldepartmentInfo(params).then((response: any) => {
        callback && callback()
        return resolve(response)
      });
    })
  }

  return {
    formData,
    formPageResetHandle,
    createHospitaldepartmentInfoHandle,
    updateHospitaldepartmentInfoHandle,
    updateHospitaldepartmentInfoIntroduceByIdHandle,
    getPageHandle,
    deleteHospitaldepartmentInfoByIdHandle,
    exchangeHospitaldepartmentInfoHandle,
  }
}


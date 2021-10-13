import { ref } from 'vue';
import {
  createHospitalInfo,
  updateHospitalInfo,
  getHospitalInfoPage,
  getHospitalInfoById,
  deleteHospitalInfoById,
  updateHospitalInfoIntroduceById,
  updateHospitalInfoMedicalById,
} from '/@/api/hospital/info';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n'

export default function useHospitalInfoRepository() {
  const { t } = useI18n()
  const formData = ref({})

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 创建
  const createHospitalInfoHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      createHospitalInfo(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 修改
  const updateHospitalInfoHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      updateHospitalInfo(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 添加/修改医院简介
  const updateHospitalInfoIntroduceByIdHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      updateHospitalInfoIntroduceById(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 添加/修改医保定点
  const updateHospitalInfoMedicalByIdHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      updateHospitalInfoMedicalById(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getHospitalInfoPage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 根据id获取数据
  const getHospitalInfoByIdHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      getHospitalInfoById(params).then((response: any) => {
        formData.value = response
        callback && callback()
        resolve(response)
      });
    })
  }

  // 删除
  const deleteHospitalInfoByIdHandle = (params: any, callback: any) => {
    ElMessageBox.confirm(t('table.deleteTipMessage'), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        deleteHospitalInfoById(params).then(() => {
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
    createHospitalInfoHandle,
    updateHospitalInfoHandle,
    updateHospitalInfoIntroduceByIdHandle,
    updateHospitalInfoMedicalByIdHandle,
    getPageHandle,
    getHospitalInfoByIdHandle,
    deleteHospitalInfoByIdHandle,
  }
}


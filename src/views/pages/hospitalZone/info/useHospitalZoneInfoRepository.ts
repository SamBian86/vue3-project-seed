import { ref } from 'vue';
import {
  createHospitalZoneInfo,
  updateHospitalZoneInfo,
  updateHospitalZoneInfoPhoto,
  getHospitalZoneInfoPage,
  deleteHospitalZoneInfoById,
  exchangeHospitalZoneInfo
} from '/@/api/hospitalZone/info';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n'

export default function useHospitalZoneInfoRepository() {
  const { t } = useI18n()
  const formData = ref({})

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 创建
  const createHospitalZoneInfoHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      createHospitalZoneInfo(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 修改
  const updateHospitalZoneInfoHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      updateHospitalZoneInfo(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 新增、修改环境展示图片
  const updateHospitalZoneInfoPhotoHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      updateHospitalZoneInfoPhoto(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getHospitalZoneInfoPage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 删除
  const deleteHospitalZoneInfoByIdHandle = (params: any, callback: any) => {
    ElMessageBox.confirm(t('table.deleteTipMessage'), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        deleteHospitalZoneInfoById(params).then(() => {
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
  const exchangeHospitalZoneInfoHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      exchangeHospitalZoneInfo(params).then((response: any) => {
        callback && callback()
        return resolve(response)
      });
    })
  }

  return {
    formData,
    formPageResetHandle,
    createHospitalZoneInfoHandle,
    updateHospitalZoneInfoHandle,
    updateHospitalZoneInfoPhotoHandle,
    getPageHandle,
    deleteHospitalZoneInfoByIdHandle,
    exchangeHospitalZoneInfoHandle,
  }
}


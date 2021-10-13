import { ref } from 'vue';
import {
  createVolunteerInfo,
  updateVolunteerInfo,
  getVolunteerInfoListAll,
  getVolunteerInfoPage,
  getVolunteerInfoById,
  deleteVolunteerInfoById,
} from '/@/api/volunteer/info';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n'

export default function useVolunteerInfoRepository() {
  const { t } = useI18n()
  const formData = ref({})
  const volunteerInfoListAll = ref([])

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 创建
  const createVolunteerInfoHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      createVolunteerInfo(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 修改
  const updateVolunteerInfoHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      updateVolunteerInfo(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 获取列表数据
  const getVolunteerInfoListAllHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getVolunteerInfoListAll(params).then((response: any) => {
        volunteerInfoListAll.value = response
        resolve(response)
      });
    })
  }


  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getVolunteerInfoPage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 根据id获取数据
  const getVolunteerInfoByIdHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      getVolunteerInfoById(params).then((response: any) => {
        formData.value = response
        callback && callback()
        resolve(response)
      });
    })
  }

  // 删除
  const deleteVolunteerInfoByIdHandle = (params: any, callback: any) => {
    ElMessageBox.confirm(t('table.deleteTipMessage'), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        deleteVolunteerInfoById(params).then(() => {
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
    createVolunteerInfoHandle,
    updateVolunteerInfoHandle,
    volunteerInfoListAll,
    getVolunteerInfoListAllHandle,
    getPageHandle,
    getVolunteerInfoByIdHandle,
    deleteVolunteerInfoByIdHandle,
  }
}


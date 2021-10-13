import { ref } from 'vue';
import {
  createVolunteerServerdurationdetail,
  updateVolunteerServerdurationdetail,
  getVolunteerServerdurationdetailListAll,
  getVolunteerServerdurationdetailPage,
  getVolunteerServerdurationdetailById,
  deleteVolunteerServerdurationdetailById,
} from '/@/api/volunteer/serverdurationdetail';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n'

export default function useVolunteerServerdurationdetailRepository() {
  const { t } = useI18n()
  const formData = ref({})
  const volunteerServerdurationdetailListAll = ref([])

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 创建
  const createVolunteerServerdurationdetailHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      createVolunteerServerdurationdetail(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 修改
  const updateVolunteerServerdurationdetailHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      updateVolunteerServerdurationdetail(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 获取列表数据
  const getVolunteerServerdurationdetailListAllHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getVolunteerServerdurationdetailListAll(params).then((response: any) => {
        volunteerServerdurationdetailListAll.value = response
        resolve(response)
      });
    })
  }

  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getVolunteerServerdurationdetailPage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 根据id获取数据
  const getVolunteerServerdurationdetailByIdHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      getVolunteerServerdurationdetailById(params).then((response: any) => {
        formData.value = response
        callback && callback()
        resolve(response)
      });
    })
  }

  // 删除
  const deleteVolunteerServerdurationdetailByIdHandle = (params: any, callback: any) => {
    ElMessageBox.confirm(t('table.deleteTipMessage'), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        deleteVolunteerServerdurationdetailById(params).then(() => {
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
    createVolunteerServerdurationdetailHandle,
    updateVolunteerServerdurationdetailHandle,
    volunteerServerdurationdetailListAll,
    getVolunteerServerdurationdetailListAllHandle,
    getPageHandle,
    getVolunteerServerdurationdetailByIdHandle,
    deleteVolunteerServerdurationdetailByIdHandle,
  }
}


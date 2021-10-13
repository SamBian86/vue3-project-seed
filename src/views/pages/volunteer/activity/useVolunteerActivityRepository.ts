import { ref } from 'vue';
import {
  createVolunteerActivity,
  updateVolunteerActivity,
  getVolunteerActivityListAll,
  getVolunteerActivityPage,
  getVolunteerActivityApplyList,
  reviewVolunteerActivity,
  getVolunteerActivityById,
  deleteVolunteerActivityById,
} from '/@/api/volunteer/activity';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n'

export default function useVolunteerActivityRepository() {
  const { t } = useI18n()
  const formData = ref({})
  const volunteerActivityListAll = ref([])

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 创建
  const createVolunteerActivityHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      createVolunteerActivity(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 修改
  const updateVolunteerActivityHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      updateVolunteerActivity(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 获取列表数据
  const getVolunteerActivityListAllHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getVolunteerActivityListAll(params).then((response: any) => {
        volunteerActivityListAll.value = response
        resolve(response)
      });
    })
  }

  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getVolunteerActivityPage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 获取活动报名列表分页
  const getVolunteerActivityApplyListHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getVolunteerActivityApplyList(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 添加活动回顾链接
  const reviewVolunteerActivityHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      reviewVolunteerActivity(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 根据id获取数据
  const getVolunteerActivityByIdHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      getVolunteerActivityById(params).then((response: any) => {
        formData.value = response
        callback && callback()
        resolve(response)
      });
    })
  }

  // 删除
  const deleteVolunteerActivityByIdHandle = (params: any, callback: any) => {
    ElMessageBox.confirm(t('table.deleteTipMessage'), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        deleteVolunteerActivityById(params).then(() => {
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
    createVolunteerActivityHandle,
    updateVolunteerActivityHandle,
    volunteerActivityListAll,
    getVolunteerActivityListAllHandle,
    getPageHandle,
    getVolunteerActivityApplyListHandle,
    reviewVolunteerActivityHandle,
    getVolunteerActivityByIdHandle,
    deleteVolunteerActivityByIdHandle,
  }
}


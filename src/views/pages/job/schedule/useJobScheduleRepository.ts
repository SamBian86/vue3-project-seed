import { ref } from 'vue';
import {
  createJobSchedule,
  updateJobSchedule,
  getJobSchedulePage,
  getJobScheduleById,
  deleteJobScheduleById,
  pauseJobSchedule,
  resumeJobSchedule,
  runJobSchedule
} from '/@/api/job/schedule';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n'

export default function useJobScheduleRepository() {
  const { t } = useI18n()
  const formData = ref({})

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 创建
  const createJobScheduleHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      createJobSchedule(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 修改
  const updateJobScheduleHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      updateJobSchedule(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getJobSchedulePage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 根据id获取数据
  const getJobScheduleByIdHandle = (params: any, callback: any) => {
    getJobScheduleById(params).then((response: any) => {
      formData.value = response
      callback && callback()
    });
  }

  // 删除
  const deleteJobScheduleByIdHandle = (params: any, callback: any) => {
    const len = params.length
    if (!len) {
      return false
    }
    ElMessageBox.confirm(t('table.deleteTipWithMessage', { message: len }), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        deleteJobScheduleById(params).then(() => {
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

  // 暂停
  const pauseJobScheduleHandle = (params: any, callback: any) => {
    const len = params.length
    if (!len) {
      return false
    }
    ElMessageBox.confirm(t('JobSchedule.pauseTipMessage', { message: len }), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        pauseJobSchedule(params).then(() => {
          ElMessage({
            type: 'success',
            message: t('JobSchedule.pauseSuccessMessage'),
          });
          callback && callback()
        });
      })
      .catch(() => {
      });
  }

  // 恢复 
  const resumeJobScheduleHandle = (params: any, callback: any) => {
    const len = params.length
    if (!len) {
      return false
    }
    ElMessageBox.confirm(t('JobSchedule.resumeTipMessage', { message: len }), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        resumeJobSchedule(params).then(() => {
          ElMessage({
            type: 'success',
            message: t('JobSchedule.resumeSuccessMessage'),
          });
          callback && callback()
        });
      })
      .catch(() => {
      });
  }

  // 立即执行
  const runJobScheduleHandle = (params: any, callback: any) => {
    const len = params.length
    if (!len) {
      return false
    }
    ElMessageBox.confirm(t('JobSchedule.runTipMessage', { message: len }), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        runJobSchedule(params).then(() => {
          ElMessage({
            type: 'success',
            message: t('JobSchedule.runSuccessMessage'),
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
    createJobScheduleHandle,
    updateJobScheduleHandle,
    getPageHandle,
    getJobScheduleByIdHandle,
    deleteJobScheduleByIdHandle,
    pauseJobScheduleHandle,
    resumeJobScheduleHandle,
    runJobScheduleHandle
  }
}


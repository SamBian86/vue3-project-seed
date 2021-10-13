import { ref } from 'vue';
import {
  getJobScheduleLogPage,
  getJobScheduleLogById,
} from '/@/api/job/scheduleLog';
import { useI18n } from 'vue-i18n'

export default function useJobScheduleLogRepository() {
  const { t } = useI18n()
  const formData = ref({})

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getJobScheduleLogPage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 根据id获取数据
  const getJobScheduleLogByIdHandle = (params: any, callback: any) => {
    getJobScheduleLogById(params).then((response: any) => {
      formData.value = response
      callback && callback()
    });
  }

  return {
    formData,
    formPageResetHandle,
    getPageHandle,
    getJobScheduleLogByIdHandle,
  }
}


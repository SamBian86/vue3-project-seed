import { ref } from 'vue';
import {
  updateSysConsult,
  getSysConsultPage,
  exportSysConsultList,
  getSysConsultById,
} from '/@/api/sys/consult';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n'

export default function useSysConsultRepository() {
  const { t } = useI18n()
  const formData = ref({})

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 处理
  const updateSysConsultHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      updateSysConsult(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getSysConsultPage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 导出
  const exportHandle = (params: any) => {
    exportSysConsultList(params)
  }

  // 根据id获取数据
  const getSysConsultByIdHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      getSysConsultById(params).then((response: any) => {
        formData.value = response
        callback && callback()
        resolve(response)
      });
    })
  }

  return {
    formData,
    formPageResetHandle,
    updateSysConsultHandle,
    getPageHandle,
    exportHandle,
    getSysConsultByIdHandle,
  }
}


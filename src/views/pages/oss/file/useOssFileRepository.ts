import { ref } from 'vue';
import {
  createOssFile,
  getOssFilePage,
  getOssFileInfo,
  deleteOssFile,
  uploadOssFile
} from '/@/api/oss/file';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n'

export default function useOssFileRepository() {
  const { t } = useI18n()
  const formData = ref({})

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 创建
  const createOssFileHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      createOssFile(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getOssFilePage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 云存储配置信息
  const getOssFileInfoHandle = () => {
    return new Promise((resolve, reject) => {
      getOssFileInfo().then((response: any) => {
        formData.value = response
        resolve(response)
      });
    })
  }

  // 上传
  const uploadOssFileHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      uploadOssFile(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 删除多个
  const deleteOssFileByIdsHandle = (params: any, callback: any) => {
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
        deleteOssFile(params).then(() => {
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
    createOssFileHandle,
    getPageHandle,
    getOssFileInfoHandle,
    uploadOssFileHandle,
    deleteOssFileByIdsHandle,
  }
}


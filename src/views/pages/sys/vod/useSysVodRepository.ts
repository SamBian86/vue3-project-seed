import { ref } from 'vue';
import {
  createSysVod,
  updateSysVod,
  getSysVodList,
  getSysVodPage,
  getSysVodById,
  deleteSysVodVideoById,
  getSysVodUploadVideoVoucher,
  getSysVodUploadVideoById,
  getSysVodPlayInfo
} from '/@/api/sys/vod';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n'

export default function useSysVodRepository() {
  const { t } = useI18n()
  const formData = ref({})
  const sysVodList = ref([])
  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 创建
  const createSysVodHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      createSysVod(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 修改
  const updateSysVodHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      updateSysVod(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 获取列表数据
  const getSysVodListHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getSysVodList(params).then((response: any) => {
        sysVodList.value = response
        resolve(response)
      });
    })
  }


  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getSysVodPage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 根据id获取数据
  const getSysVodByIdHandle = (params: any, callback: any) => {
    getSysVodById(params).then((response: any) => {
      formData.value = response
      callback && callback()
    });
  }

  // 上传
  // const uploadSysVodHandle = (params: any) => {
  //   return new Promise((resolve, reject) => {
  //     uploadSysVod(params).then((response: any) => {
  //       resolve(response)
  //     });
  //   })
  // }

  // 删除
  const deleteSysVodVideoByIdHandle = (params: any, callback: any) => {
    ElMessageBox.confirm(t('table.deleteTipMessage'), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        deleteSysVodVideoById(params).then(() => {
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

  // 获取视频上传凭证和地址
  const getSysVodUploadVideoVoucherHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getSysVodUploadVideoVoucher(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 获取视频上传凭证和地址
  const getSysVodUploadVideoByIdHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getSysVodUploadVideoById(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 获取视频播放地址
  const getSysVodPlayInfoHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getSysVodPlayInfo(params).then((response: any) => {
        resolve(response)
      });
    })
  }


  return {
    formData,
    formPageResetHandle,
    createSysVodHandle,
    updateSysVodHandle,
    sysVodList,
    getSysVodListHandle,
    getPageHandle,
    getSysVodByIdHandle,
    deleteSysVodVideoByIdHandle,
    getSysVodUploadVideoVoucherHandle,
    getSysVodUploadVideoByIdHandle,
    getSysVodPlayInfoHandle
  }
}


import { ref } from 'vue';
import {
  createSysDictType,
  updateSysDictType,
  getSysDictTypeAll,
  getSysDictTypePage,
  getSysDictTypeById,
  deleteSysDictTypeById
} from '/@/api/sys/dict/type';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n'

export default function useSysDictTypeRepository() {
  const { t } = useI18n()
  const formData = ref({})

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 创建
  const createSysDictTypeHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      createSysDictType(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 修改
  const updateSysDictTypeHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      updateSysDictType(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 获取列表数据
  const getSysDictTypeAllHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getSysDictTypeAll(params).then((response: any) => {
        resolve(response)
      });
    })
  }


  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getSysDictTypePage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 根据id获取数据
  const getSysDictTypeByIdHandle = (params: any, callback: any) => {
    getSysDictTypeById(params).then((response: any) => {
      formData.value = response
      callback && callback()
    });
  }

  // 删除
  const deleteSysDictTypeByIdHandle = (params: any, callback: any) => {
    ElMessageBox.confirm(t('table.deleteTipMessage'), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        deleteSysDictTypeById(params).then(() => {
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
    createSysDictTypeHandle,
    updateSysDictTypeHandle,
    getSysDictTypeAllHandle,
    getPageHandle,
    getSysDictTypeByIdHandle,
    deleteSysDictTypeByIdHandle,
  }
}


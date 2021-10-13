import { ref, reactive } from 'vue';
import {
  createSysDictData,
  updateSysDictData,
  // getSysDictDataList,
  getSysDictDataPage,
  // exportSysDictData,
  getSysDictDataById,
  deleteSysDictDataById,
  getSysDictDataByType,
  getSysDictDataByTypeAndCode
} from '/@/api/sys/dict/data';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n'

export default function useSysDictDataRepository() {
  const { t } = useI18n()
  const formData = ref({})
  const sysDictDataByType = ref([])
  const sysDictDataByTypeAndCode = ref([])

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 创建
  const createSysDictDataHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      createSysDictData(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 修改
  const updateSysDictDataHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      updateSysDictData(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 获取列表数据
  // const getSysDictDataListHandle = (params: any) => {
  //   return new Promise((resolve, reject) => {
  //     getSysDictDataList(params).then((response: any) => {
  //       resolve(response)
  //     });
  //   })
  // }


  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getSysDictDataPage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 导出
  // const exportHandle = (params: any) => {
  //   exportSysDictData(params)
  // }

  // 根据id获取数据
  const getSysDictDataByIdHandle = (params: any, callback: any) => {
    getSysDictDataById(params).then((response: any) => {
      formData.value = response
      callback && callback()
    });
  }

  // 删除
  const deleteSysDictDataByIdHandle = (params: any, callback: any) => {
    ElMessageBox.confirm(t('table.deleteTipMessage'), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        deleteSysDictDataById(params).then(() => {
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

  // 根据type查询数据字典（加载下拉选）
  const getSysDictDataByTypeHandle = (params: any) => {
    getSysDictDataByType(params).then((response: any) => {
      sysDictDataByType.value = response
    });
  }

  // 根据type及code查所有子类型
  const getSysDictDataByTypeAndCodeHandle = (params: any) => {
    getSysDictDataByTypeAndCode(params).then((response: any) => {
      sysDictDataByTypeAndCode.value = response
    });
  }

  return {
    formData,
    formPageResetHandle,
    createSysDictDataHandle,
    updateSysDictDataHandle,
    // getSysDictDataListHandle,
    getPageHandle,
    // exportHandle,
    getSysDictDataByIdHandle,
    deleteSysDictDataByIdHandle,
    getSysDictDataByTypeHandle,
    sysDictDataByTypeAndCode,
    getSysDictDataByTypeAndCodeHandle
  }
}


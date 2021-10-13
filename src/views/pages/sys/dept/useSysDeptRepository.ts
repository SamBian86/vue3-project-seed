import { ref } from 'vue';
import {
  createSysDept,
  updateSysDept,
  getSysDeptList,
  getSysDeptPage,
  getSysDeptById,
  deleteSysDeptById,
  getSysDeptTree,
  getSysDeptParentDeptId,
  getSysDeptPermissionListAll,
  getSysDeptPermissionListTree,
  getSysDeptSelect
} from '/@/api/sys/dept';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n'

export default function useSysDeptRepository() {
  const { t } = useI18n()
  const formData = ref({})
  const sysDeptList = ref([])
  const sysDeptTree = ref([])
  const sysDeptParentDeptId = ref(0)
  const sysDeptPermissionListAll = ref([])
  const sysDeptPermissionListTree = ref([])
  const sysDeptSelect = ref([])

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 创建
  const createSysDeptHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      createSysDept(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 修改
  const updateSysDeptHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      updateSysDept(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 获取列表数据
  const getSysDeptListHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getSysDeptList(params).then((response: any) => {
        sysDeptList.value = response
        resolve(response)
      });
    })
  }


  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getSysDeptPage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 根据id获取数据
  const getSysDeptByIdHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      getSysDeptById(params).then((response: any) => {
        formData.value = response
        callback && callback()
        resolve(response)
      });
    })
  }

  // 删除
  const deleteSysDeptByIdHandle = (params: any, callback: any) => {
    ElMessageBox.confirm(t('table.deleteTipMessage'), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        deleteSysDeptById(params).then(() => {
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

  // 树
  const getSysDeptTreeHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getSysDeptTree(params).then((response: any) => {
        sysDeptTree.value = response
        resolve(response)
      });
    })
  }

  // 上级部门id
  const getSysDeptParentDeptIdHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getSysDeptParentDeptId(params).then((response: any) => {
        sysDeptParentDeptId.value = response
        resolve(response)
      });
    })
  }

  // 部门下拉框list all
  const getSysDeptPermissionListAllHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getSysDeptPermissionListAll(params).then((response: any) => {
        sysDeptPermissionListAll.value = response
        resolve(response)
      });
    })
  }

  // 部门下拉框 tree all
  const getSysDeptPermissionListTreeHandle = () => {
    return new Promise((resolve, reject) => {
      getSysDeptPermissionListTree().then((response: any) => {
        sysDeptPermissionListTree.value = response
        resolve(response)
      });
    })
  }

  // 部门下拉框 select
  const getSysDeptSelectHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getSysDeptSelect(params).then((response: any) => {
        sysDeptSelect.value = response
        resolve(response)
      });
    })
  }

  return {
    formData,
    formPageResetHandle,
    createSysDeptHandle,
    updateSysDeptHandle,
    getSysDeptListHandle,
    getPageHandle,
    getSysDeptByIdHandle,
    deleteSysDeptByIdHandle,
    sysDeptList,
    sysDeptTree,
    getSysDeptTreeHandle,
    sysDeptParentDeptId,
    getSysDeptParentDeptIdHandle,
    sysDeptPermissionListAll,
    getSysDeptPermissionListAllHandle,
    sysDeptPermissionListTree,
    getSysDeptPermissionListTreeHandle,
    sysDeptSelect,
    getSysDeptSelectHandle
  }
}


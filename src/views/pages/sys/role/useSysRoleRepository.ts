import { ref } from 'vue';
import {
  createSysRole,
  updateSysRole,
  getSysRoleList,
  getSysRolePage,
  getSysRoleById,
  deleteSysRoleById
} from '/@/api/sys/role';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n'

export default function useSysRoleRepository() {
  const { t } = useI18n()
  const formData = ref({})
  const sysRoleList = ref([])

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 创建
  const createSysRoleHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      createSysRole(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 修改
  const updateSysRoleHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      updateSysRole(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 获取列表数据
  const getSysRoleListHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getSysRoleList(params).then((response: any) => {
        sysRoleList.value = response
        resolve(response)
      });
    })
  }

  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getSysRolePage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 根据id获取数据
  const getSysRoleByIdHandle = (params: any, callback: any) => {
    getSysRoleById(params).then((response: any) => {
      formData.value = response
      callback && callback()
    });
  }

  // 删除
  const deleteSysRoleByIdHandle = (params: any, callback: any) => {
    ElMessageBox.confirm(t('table.deleteTipMessage'), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        deleteSysRoleById(params).then(() => {
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
    createSysRoleHandle,
    updateSysRoleHandle,
    sysRoleList,
    getSysRoleListHandle,
    getPageHandle,
    getSysRoleByIdHandle,
    deleteSysRoleByIdHandle,
  }
}


import { ref } from 'vue';
import {
  getSysUser,
  createSysUser,
  updateSysUser,
  getSysUserPage,
  getSysUserById,
  deleteSysUserById,
  getSysUserOrderByPhoneNumber,
  updateSysUserPassword,
  getSysUserPhoneList
} from '/@/api/sys/user';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n'

export default function useSysUserRepository() {
  const { t } = useI18n()
  const formData = ref({})
  const sysUserOrderByPhoneNumber = ref({})
  const sysUserPhoneList = ref({})

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 
  const getSysUserHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getSysUser(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 创建
  const createSysUserHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      createSysUser(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 修改
  const updateSysUserHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      updateSysUser(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getSysUserPage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 根据id获取数据
  const getSysUserByIdHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      getSysUserById(params).then((response: any) => {
        formData.value = response
        callback && callback()
        resolve(response)
      });
    })
  }

  // 删除
  const deleteSysUserByIdHandle = (params: any, callback: any) => {
    ElMessageBox.confirm(t('table.deleteTipMessage'), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        deleteSysUserById(params).then(() => {
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

  // 查询派单员工
  const getSysUserOrderByPhoneNumberHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getSysUserOrderByPhoneNumber(params).then((response: any) => {
        sysUserOrderByPhoneNumber.value = response
        resolve(response)
      });
    })
  }

  // 修改密码
  const updateSysUserPasswordHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      updateSysUserPassword(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 查询用户手机号
  const getSysUserPhoneListHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getSysUserPhoneList(params).then((response: any) => {
        sysUserPhoneList.value = response
        resolve(response)
      });
    })
  }

  return {
    formData,
    getSysUserHandle,
    formPageResetHandle,
    createSysUserHandle,
    updateSysUserHandle,
    getPageHandle,
    getSysUserByIdHandle,
    deleteSysUserByIdHandle,
    sysUserOrderByPhoneNumber,
    getSysUserOrderByPhoneNumberHandle,
    updateSysUserPasswordHandle,
    sysUserPhoneList,
    getSysUserPhoneListHandle
  }
}


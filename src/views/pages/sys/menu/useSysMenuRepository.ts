
import { ref } from "vue";
import { createSysMenu, updateSysMenu, getSysMenuList, getSysMenuById, deleteSysMenuById, getSysMenuNav, getSysMenuPermissionListTree, getSysMenuPermissions, getSysMenuSelect } from "/@/api/sys/menu";
import { ElMessageBox, ElMessage } from "element-plus";
import { useI18n } from 'vue-i18n'

export default function useSysMenuRepository() {
  const { t } = useI18n()
  const formData = ref({})
  const sysMenuNav = ref([])
  const sysMenuPermissions = ref([])
  const sysMenuSelect = ref([])
  const menuListTree = ref([])
  const appMenuListTree = ref([])

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 创建
  const createSysMenuHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      createSysMenu(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 修改
  const updateSysMenuHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      updateSysMenu(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 获取列表数据
  const getSysMenuListHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getSysMenuList(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 根据id获取数据
  const getSysMenuByIdHandle = (params: any, callback: any) => {
    getSysMenuById(params).then((response: any) => {
      formData.value = response
      callback && callback()
    });
  }

  // 删除
  const deleteSysMenuByIdHandle = (params: any, callback: any) => {
    ElMessageBox.confirm(t('table.deleteTipMessage'), t('table.deleteTipName'), {
      confirmButtonText: t('table.sure'),
      cancelButtonText: t('table.cancel'),
      type: 'warning',
    })
      .then(() => {
        deleteSysMenuById(params).then(() => {
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

  // 导航
  // getSysMenuNav
  const getSysMenuNavHandle = () => {
    return new Promise((resolve, reject) => {
      getSysMenuNav().then((response: any) => {
        sysMenuNav.value = response
        resolve(response)
      });
    })
  }

  // 选择菜单(添加、修改菜单)
  const getSysMenuPermissionListTreeHandle = () => {
    return new Promise((resolve, reject) => {
      getSysMenuPermissionListTree().then((response: any) => {
        menuListTree.value = response.backgroundTree
        appMenuListTree.value = response.appTree
        resolve(response)
      });
    })
  }

  // 权限标识
  // getSysMenuPermissions
  const getSysMenuPermissionsHandle = () => {
    return new Promise((resolve, reject) => {
      getSysMenuPermissions().then((response: any) => {
        sysMenuPermissions.value = response
        resolve(response)
      });
    })
  }

  // 角色菜单权限
  // getSysMenuSelect
  const getSysMenuSelectHandle = () => {
    return new Promise((resolve, reject) => {
      getSysMenuSelect().then((response: any) => {
        sysMenuSelect.value = response
        resolve(response)
      });
    })
  }

  return {
    formData,
    formPageResetHandle,
    createSysMenuHandle,
    updateSysMenuHandle,
    getSysMenuListHandle,
    getSysMenuByIdHandle,
    deleteSysMenuByIdHandle,
    sysMenuNav,
    getSysMenuNavHandle,
    menuListTree,
    appMenuListTree,
    getSysMenuPermissionListTreeHandle,
    sysMenuPermissions,
    getSysMenuPermissionsHandle,
    sysMenuSelect,
    getSysMenuSelectHandle

  }
}
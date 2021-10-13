import { ref } from 'vue';
import {
  tagSysFrontUserBin,
  getSysFrontUserPhonelist,
  getSysFrontUserPage,
  getSysFrontUserById,
  displaySysFrontUser
} from '/@/api/sys/front/user';

export default function useSysFrontUserRepository() {
  const formData = ref({})
  const sysFrontUserPhonelist = ref([])

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 标记前端用户
  const tagSysFrontUserBinHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      tagSysFrontUserBin(params).then((response: any) => {
        return resolve(response)
      });
    })
  }

  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getSysFrontUserPage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 查询用户手机号
  const getSysFrontUserPhonelistHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getSysFrontUserPhonelist(params).then((response: any) => {
        sysFrontUserPhonelist.value = response
        resolve(response)
      });
    })
  }

  // 根据id获取数据
  const getSysFrontUserByIdHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      getSysFrontUserById(params).then((response: any) => {
        formData.value = response
        callback && callback()
        resolve(response)
      });
    })
  }

  // 修改状态
  const displaySysFrontUserHandle = (params: any, callback: any) => {
    return new Promise((resolve, reject) => {
      displaySysFrontUser(params).then((response: any) => {
        callback && callback()
        return resolve(response)
      });
    })
  }

  return {
    formData,
    formPageResetHandle,
    tagSysFrontUserBinHandle,
    sysFrontUserPhonelist,
    getSysFrontUserPhonelistHandle,
    getPageHandle,
    getSysFrontUserByIdHandle,
    displaySysFrontUserHandle,
  }
}


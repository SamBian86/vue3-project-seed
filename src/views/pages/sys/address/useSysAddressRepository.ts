import { ref } from 'vue';
import {
  getSysAddress
} from '/@/api/sys/address';

export default function useSysAddressRepository() {
  const formData = ref({})
  const sysAddress = ref([])

  // 重置表单
  const formPageResetHandle = (callback: any) => {
    formData.value = {}
    callback && callback()
  }

  // 获取列表数据
  const getSysAddressHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getSysAddress(params).then((response: any) => {
        sysAddress.value = response
        resolve(response)
      });
    })
  }

  return {
    formData,
    formPageResetHandle,
    sysAddress,
    getSysAddressHandle
  }
}


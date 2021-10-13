import { exportSysLogLogin, getSysLogLoginPage } from "/@/api/sys/log/login";

export default function useSysLogLoginRepository() {

  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getSysLogLoginPage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 导出
  const exportHandle = (params: any) => {
    exportSysLogLogin(params)
  }

  return {
    getPageHandle,
    exportHandle,
  }
}
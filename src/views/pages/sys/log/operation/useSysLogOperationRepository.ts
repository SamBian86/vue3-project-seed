import { exportSysLogOperation, getSysLogOperationPage } from "/@/api/sys/log/operation";

export default function useSysLogOperationRepository() {

  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getSysLogOperationPage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 导出
  const exportHandle = (params: any) => {
    exportSysLogOperation(params)
  }

  return {
    getPageHandle,
    exportHandle,
  }
}
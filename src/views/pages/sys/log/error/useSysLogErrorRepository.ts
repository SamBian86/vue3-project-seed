import {
  getSysLogErrorPage,
  exportSysLogError,
} from '/@/api/sys/log/error';

export default function useSysLogErrorRepository() {

  // 获取分页数据
  const getPageHandle = (params: any) => {
    return new Promise((resolve, reject) => {
      getSysLogErrorPage(params).then((response: any) => {
        resolve(response)
      });
    })
  }

  // 导出
  const exportHandle = (params: any) => {
    exportSysLogError(params)
  }

  return {
    getPageHandle,
    exportHandle,
  }
}


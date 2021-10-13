import type { CreateAxiosOptions, AxiosTransform } from "/#/axios"
import { VAxios } from './Axios';
import { OptionsEnum, ContentTypeEnum, CodeEnum } from "./AxiosEnum"
import { getToken, getLanguage } from "/@/utils/cache/localStorage";
import { isFunction } from "/@/utils"
import { ElMessage } from "element-plus";
import router from '/@/router'

// 拦截器钩子抽象类实现
const transform: AxiosTransform = {
  // 发送前的数据处理
  beforeRequestHook: (config, options) => {
    // 私有钩子
    const { beforeRequestHook } = options
    // 用于页面特殊逻辑
    if (beforeRequestHook && isFunction(beforeRequestHook)) {
      return beforeRequestHook(config)
    }

    // 正常逻辑处理
    return config
  },
  // 获取数据以后的数据处理
  requestSuccessHook: (response, options) => {
    const { data } = response
    const { msg, code, results } = data

    // 导出功能
    if (data instanceof Blob) {
      const reader = new FileReader()
      const filename = decodeURI(response['headers']['content-disposition'].toLowerCase().split('filename=')[1])
      reader.onload = function (e) {
        const url = e.target.result
        // 转换完成，创建一个a标签用于下载
        const filelink = document.createElement('a')
        filelink.download = filename
        filelink.href = url
        document.body.appendChild(filelink)
        filelink.click()
        // 释放url
        window.URL.revokeObjectURL(url)
        document.body.removeChild(filelink)
      }
      reader.readAsDataURL(response.data) // 转换为base64
      return response.data
    }
    // 私有钩子
    const { requestSuccessHook } = options
    // 用于页面特殊逻辑,需要在调用接口的时候配置 requestSuccessHook
    if (requestSuccessHook && isFunction(requestSuccessHook) && code === CodeEnum.SUCCESS) {
      return requestSuccessHook(results)
    }

    // 正常逻辑处理
    // 成功逻辑
    if (code === CodeEnum.SUCCESS) {
      // ElMessage.success(msg)
      return results
    } else if (code === CodeEnum.NO_AUTH) {
      ElMessage.error(msg)
      router.push({ path: `/login` })
    } else {
      throw new Error(msg);
    }
  },
  // 默认 requestFailedHook 钩子
  requestFailedHook: (message, options, response) => {
    const { requestFailedHook } = options
    const { data } = response
    // 用于页面特殊逻辑
    if (requestFailedHook && isFunction(requestFailedHook)) {
      return requestFailedHook(message, data)
    } else {
      // 正常逻辑处理
      ElMessage.error(message)
    }
  },
  // 请求失败以后的处理
  requestCatchHook: (message, options) => {
    const { requestCatchHook } = options
    // 用于页面特殊逻辑
    if (requestCatchHook && isFunction(requestCatchHook)) {
      return requestCatchHook(message)
    }

    // 正常逻辑处理
    ElMessage.error(message)
    return message
  },
  requestMergeConfigHook: (config, options) => {
    const _config = Object.assign({}, config, options)
    let headers
    // 如果需要修改headers在请求的第二个参数中修改
    if (options.requestOptions) {
      headers = { ...config.headers, ...options.requestOptions.headers }
    }
    _config.headers = headers
    _config.headers['Accept-Language'] = getLanguage()
    _config.headers['token'] = getToken()
    return _config
  }
}

function createAxios(options?: Partial<CreateAxiosOptions>) {
  return new VAxios(Object.assign({
    // 超时时间
    timeout: OptionsEnum.timeout,
    // API地址
    baseURL: import.meta.env.VITE_APP_API_URL,
    // 默认请求头
    headers: { 'Content-Type': ContentTypeEnum.JSON },
    // 跨域请求时是否需要使用凭证
    withCredentials: !!OptionsEnum.withCredentials,
    // 拦截器钩子
    transform,
    requestOptions: {}
  }, options));
}

export const request = new createAxios()

import type { CreateAxiosOptions, UploadFileParams, RequestOptions, Result } from "/#/axios"
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"
import axios from "axios"
import { ContentTypeEnum } from "./AxiosEnum"
import { isFunction } from "/@/utils"

export class VAxios {
  // 私有化引用
  private axiosInstance: AxiosInstance;

  // 初始化配置
  private readonly options: CreateAxiosOptions;

  constructor(options: CreateAxiosOptions | any) {
    this.options = options
    this.axiosInstance = axios.create(options)
    this.setupInterceptors();
  }

  // 获取拦截器钩子
  private getTransform() {
    const { transform } = this.options;
    return transform;
  }

  // 设置requestOptions
  private setRequestOptions(options: RequestOptions) {
    this.options.requestOptions = options
  }

  // 文件上传方法
  uploadFile<T = any>(config: AxiosRequestConfig) {
    const formData = new FormData()
    Object.keys(config.data).map(item => {
      formData.set(item, config.data[item])
    })
    config.data = formData
    return this.axiosInstance.request<T>({
      ...config,
      method: 'POST',
      headers: {
        'Content-type': ContentTypeEnum.FORM_DATA,
      },
    });
  }

  private setupInterceptors() {
    console.log('setupInterceptors')
    const transform = this.getTransform();
    if (!transform) {
      return;
    }
    const {
      requestMergeConfigHook,
      requestInterceptorsCatch,
      responseInterceptors,
      responseInterceptorsCatch
    } = transform;

    // request拦截器
    this.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
      if (requestMergeConfigHook && isFunction(requestMergeConfigHook)) {
        config = requestMergeConfigHook(config, this.options);
      }
      return config;
    }, undefined);
    // request拦截器错误处理
    requestInterceptorsCatch && isFunction(requestInterceptorsCatch) && this.axiosInstance.interceptors.request.use(undefined, requestInterceptorsCatch)

    // response拦截器
    this.axiosInstance.interceptors.response.use((response: AxiosResponse<any>) => {
      // console.log('response拦截器')
      if (responseInterceptors && isFunction(responseInterceptors)) {
        return responseInterceptors(response)
      }
      return response;
    }, undefined);
    // request拦截器错误处理
    responseInterceptorsCatch &&
      isFunction(responseInterceptorsCatch) &&
      this.axiosInstance.interceptors.response.use(undefined, responseInterceptorsCatch);

  }

  // form-data提交方法
  supportFormData(config: AxiosRequestConfig) { }

  // GET请求
  get<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'GET' }, options);
  }

  // POST请求
  post<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'POST' }, options);
  }

  // PUT请求
  put<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'PUT' }, options || {
      headers: { 'Content-Type': ContentTypeEnum.JSON }
    });
  }

  // DELETE请求
  delete<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'DELETE' }, options || {
      headers: { 'Content-Type': ContentTypeEnum.JSON }
    });
  }

  // REQUEST请求
  request<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    let conf = JSON.parse(JSON.stringify(config))
    const transform = this.getTransform();
    const {
      beforeRequestHook,
      requestSuccessHook,
      requestFailedHook,
      requestCatchHook
    } = transform || {};

    // 设置RequestOptions
    this.setRequestOptions(options || {})

    if (beforeRequestHook && isFunction(beforeRequestHook)) {
      conf = beforeRequestHook(conf, options || {});
    }

    return new Promise((resolve, reject) => {
      // console.log('请求发送前')
      this.axiosInstance.request<any, Result<any>>(conf).then((response: Result<any>) => {
        // console.log('获取数据')
        if (requestSuccessHook && isFunction(requestSuccessHook)) {
          try {
            // 请求成功处理数据
            response = requestSuccessHook(response, options || {});
            resolve(response as unknown as Promise<T>);
          } catch (error: any) {
            reject(error.message)
            requestFailedHook && isFunction(requestFailedHook) && requestFailedHook(error.message, options || {}, response)
          }
          return
        }
        resolve(response as unknown as Promise<T>);
      })
        .catch((message) => {
          if (requestCatchHook && isFunction(requestCatchHook)) {
            reject(requestCatchHook(message, options || {}))
            return
          }
          reject(message)
        })
    })
  }
}

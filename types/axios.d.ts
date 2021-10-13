import type { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface CreateAxiosOptions extends AxiosRequestConfig {
  // 拦截器钩子
  transform?: AxiosTransform | undefined;
  // 自定义数据
  requestOptions?: {
    headers: any
  } | RequestOptions | undefined;
}

// 拦截器钩子抽象类
export abstract class AxiosTransform {
  // 请求发出前数据处理
  beforeRequestHook?: (config: AxiosRequestConfig, options: RequestOptions) => AxiosRequestConfig;
  // 请求成功以后数据处理
  requestSuccessHook?: (res: Result<any>, options: RequestOptions) => any;
  // 请求成功以后数据错误状态处理
  requestFailedHook?: (message: any, options: RequestOptions, response: Result<any>) => any;
  // 请求失败以后的处理
  requestCatchHook?: (message: any, options: RequestOptions) => Promise<any>;
  // ------------------------------------------------
  // 请求前拦截器用于合并配置数据
  requestMergeConfigHook?: (
    config: AxiosRequestConfig,
    options: CreateAxiosOptions
  ) => AxiosRequestConfig;
  // 请求前拦截器错误处理
  requestInterceptorsCatch?: (message: any) => void;
  // 响应之后拦截器
  responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>;
  // 响应之后拦截器错误处理
  responseInterceptorsCatch?: (message: any) => void;

}

export interface RequestOptions {
  data?: any;
  params?: any;
  // 防止后端乱搞content-type
  headers?: any;
  // 用于发送前数据处理
  beforeRequestHook?: any;
  // 需要对返回数据处理的钩子
  requestSuccessHook?: any;
  // 请求成功以后数据错误状态处理
  requestFailedHook?: any;
  // 请求失败以后的处理
  requestCatchHook?: any;
}

export interface UploadFileParams {

}

export interface Result<T = any> {
  data: any;
  code: number;
  type: 'success' | 'error' | 'warning';
  msg: string;
  result?: T;
}
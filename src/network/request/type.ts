import { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface LYRequestHook<T = AxiosResponse> {
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorsCatch?: (err: any) => any
  responseInterceptors?: (config: T) => T
  responseInterceptorsCatch?: (err: any) => any
}

export interface LYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: LYRequestHook<T>
  showLoading?: boolean
}

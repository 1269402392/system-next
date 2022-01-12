import axios, { AxiosInstance } from 'axios'
import { LYRequestConfig, LYRequestHook } from './type'
import { ElLoading } from 'element-plus'
import 'element-plus/theme-chalk/el-loading.css'

const DEFAULT_LOADING = true

class LYRequest {
  instance: AxiosInstance
  interceptors?: LYRequestHook
  loading: any
  showLoading: any

  constructor(config: LYRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    // 实例自身的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptors,
      this.interceptors?.requestInterceptorsCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptors,
      this.interceptors?.responseInterceptorsCatch
    )
    this.instance.interceptors.request.use(
      (config) => {
        if (config.headers) {
          config.headers.Authorization =
            'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibmFtZSI6ImNvZGVydGVzdCIsInJvbGUiOnsiaWQiOjMsIm5hbWUiOiLov5DokKUifSwiaWF0IjoxNjQxMDk0ODQ4LCJleHAiOjE2NDM2ODY4NDh9.tqRClHUaT9qnAO4A0Vj3SuQzWNaLZkMhJbWX8pqZRuJI9teZFXfwFlGTyYfhFjoKECJclDRY8NPh3sAYbS5fyBe-U9EvjsU5mLT5udZvKkjNmniIfxIvP1LRRypjSMtsahw6EHTlEIgFmA185UYPwyDhFnyKtmV962vp_NH2iK8'
        }
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: 'Loading...',
            background: 'rgba(0,0,0,0.5)'
          })
        }
        return config
      },
      (err) => {
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        this.loading?.close()
        return res.data
      },
      (err) => {
        return err
      }
    )
  }

  get<T = any>(config: LYRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'GET' })
  }

  post<T = any>(config: LYRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'POST' })
  }

  delete<T = any>(config: LYRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: LYRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'PATCH' })
  }

  private request<T>(config: LYRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 单个实例的showLoading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      // 属于单个请求的拦截器
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config)
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors.responseInterceptors(res)
          }
          resolve(res)
          // 初始化showLoading
          this.showLoading = DEFAULT_LOADING
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING
          reject(err)
          return err
        })
    })
  }
}

export default LYRequest

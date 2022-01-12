import LYRequest from './request'

const lyRequest = new LYRequest({
  baseURL: 'http://152.136.185.210:4000',
  interceptors: {
    requestInterceptors: (config) => {
      // if (config.headers) {
      //   config.headers.Authorization = localStorage.token
      // }
      return config
    },
    requestInterceptorsCatch: (err) => err,
    responseInterceptors: (res) => res,
    responseInterceptorsCatch: (err) => err
  }
})

export default lyRequest

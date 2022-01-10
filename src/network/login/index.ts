import { ILogin, ILoginResult } from '@/network/login/type'
import lyRequest from '@/network'
import { IDataType } from '../type'
// 枚举类型定义 请求接口路径
enum LoginAPI {
  userLogin = '/login',
  userInfo = '/users/',
  userMenus = '/role/'
}
export function loginRequest(user: ILogin) {
  return lyRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.userLogin,
    data: user
  })
}

// 根据Id查询用户
export function getUserInfo(id: number) {
  return lyRequest.get<IDataType>({
    url: LoginAPI.userInfo + id,
    showLoading: false
  })
}

// 获取用户菜单
export function getUserInMenus(id: number) {
  return lyRequest.get<IDataType>({
    url: LoginAPI.userMenus + id + '/menu',
    showLoading: false
  })
}

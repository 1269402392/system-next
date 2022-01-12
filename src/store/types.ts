import { ILoginState } from '@/store/login/types'
import { ISystemState } from './main/system/type'

export interface IRootState {
  departmentList: any[]
  roleList: any[]
  menuList: any[]
}

export interface IRootWithModule {
  loginModule: ILoginState
  systemModule: ISystemState
}

export type IStoreType = IRootWithModule & IRootState

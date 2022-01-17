import { ILoginState } from '@/store/login/types'
import { ISystemState } from './main/system/type'
import { IDashboardState } from '@/store/main/analysis/type'

export interface IRootState {
  departmentList: any[]
  roleList: any[]
  menuList: any[]
}

export interface IRootWithModule {
  loginModule: ILoginState
  systemModule: ISystemState
  dashboardModule: IDashboardState
}

export type IStoreType = IRootWithModule & IRootState

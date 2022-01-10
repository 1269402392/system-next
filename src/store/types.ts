import { ILoginState } from '@/store/login/types'
import { ISystemState } from './main/system/type'

export interface IRootState {
  name: string
  age: number
}

export interface IRootWithModule {
  loginModule: ILoginState
  systemModule: ISystemState
}

export type IStoreType = IRootWithModule & IRootState

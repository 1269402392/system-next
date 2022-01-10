import { IRootState } from '@/store/types'
import { Module } from 'vuex'
import { ISystemState } from './type'
import { getPageListData } from '@/network/main/system'
const store: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0
    }
  },
  mutations: {
    changeUsersList(state, list: any[]) {
      state.usersList = list
    },
    changeUsersCount(state, count: number) {
      state.usersCount = count
    },
    changeRoleList(state, list: any[]) {
      state.roleList = list
    },
    changeRoleCount(state, count: number) {
      state.roleCount = count
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      // 获取pageName并且将首字母转换为大写
      const pageName = payload.pageName
      const pageUrl = `/${payload.pageName}/list`

      const {
        data: { list, totalCount }
      } = await getPageListData(pageUrl, payload.queryInfo)

      // changePageName -> 将首字母转换为大写
      const changePageName = pageName.slice(0, 1).toUpperCase() + pageName.slice(1)
      commit(`change${changePageName}List`, list)
      commit(`change${changePageName}Count`, totalCount)
    }
  },
  getters: {
    getDataList(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
      }
    },
    getListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  }
}

export default store

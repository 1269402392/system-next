import { IRootState } from '@/store/types'
import { Module } from 'vuex'
import { ISystemState } from './type'
import {
  addPageData,
  deletePageData,
  editPageData,
  getPageListData
} from '@/network/main/system'
const store: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0
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
    },
    changeGoodsList(state, list: any[]) {
      state.goodsList = list
    },
    changeGoodsCount(state, count: number) {
      state.goodsCount = count
    },
    changeMenuList(state, list: any[]) {
      state.menuList = list
    },
    changeMenuCount(state, count: number) {
      state.menuCount = count
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      const pageName = payload.pageName
      // 拼接请求路径
      const pageUrl = `/${payload.pageName}/list`

      const {
        data: { list, totalCount }
      } = await getPageListData(pageUrl, payload.queryInfo)

      // changePageName -> 将首字母转换为大写
      const changePageName = pageName.slice(0, 1).toUpperCase() + pageName.slice(1)
      commit(`change${changePageName}List`, list)
      commit(`change${changePageName}Count`, totalCount)
    },
    async deleteDataAction({ dispatch }, payload: any) {
      console.log('@@', payload)
      const pageUrl = `/${payload.pageName}/${payload.id}`

      await deletePageData(pageUrl)

      dispatch('getPageListAction', {
        pageName: payload.pageName,
        queryInfo: {
          offset: 0,
          size: 3
        }
      })
    },
    async addDataAction({ dispatch }, payload: any) {
      const { pageName, newData } = payload
      const pageUrl = `/${pageName}`

      await addPageData(pageUrl, newData)

      dispatch('getPageListAction', {
        pageName: payload.pageName,
        queryInfo: {
          offset: 0,
          size: 3
        }
      })
    },
    async editDataAction({ dispatch }, payload: any) {
      const { pageName, editData, id } = payload
      const pageUrl = `/${pageName}/${id}`
      console.log(pageName, editData, id)
      await editPageData(pageUrl, editData)

      dispatch('getPageListAction', {
        pageName: payload.pageName,
        queryInfo: {
          offset: 0,
          size: 3
        }
      })
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

import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootState, IStoreType } from './types'
import loginModule from './login'
import systemModule from './main/system'

import { getPageListData } from '@/network/main/system'
import dashboardModule from '@/store/main/analysis/dashboard'

const store = createStore<IRootState>({
  state() {
    return {
      departmentList: [],
      roleList: [],
      menuList: []
    }
  },
  mutations: {
    changeDepartment(state, list: any) {
      state.departmentList = list
    },
    changeRole(state, list: any) {
      state.roleList = list
    },
    changeMenu(state, list: any) {
      state.menuList = list
    }
  },
  actions: {
    // 获取所有角色以及部门
    async getInitialDataAction({ commit }) {
      const {
        data: { list: department }
      } = await getPageListData('/department/list', {
        offset: 0,
        size: 100
      })
      const {
        data: { list: role }
      } = await getPageListData('/role/list', {
        offset: 0,
        size: 100
      })
      const {
        data: { list: menu }
      } = await getPageListData('/menu/list', {})

      commit('changeRole', role)
      commit('changeMenu', menu)
      commit('changeDepartment', department)
    }
  },
  modules: {
    loginModule,
    systemModule,
    dashboardModule
  }
})

export function setupStore() {
  store.dispatch('loginModule/setupLocalLogin').then((h) => h)
}

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store

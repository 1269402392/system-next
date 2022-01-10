import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { ILoginState } from '@/store/login/types'
import { getUserInfo, getUserInMenus, loginRequest } from '@/network/login'
import { ILogin } from '@/network/login/type'
import localCache from '@/utils/cache'
import router from '@/router'
import { mapMenusToRoutes } from '@/utils/map-menus'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: []
    }
  },
  mutations: {
    saveToken(state, token: string) {
      state.token = token
    },
    saveUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    saveUserMenus(state, userMenus: any) {
      state.userMenus = userMenus

      // 动态映射路由
      const routes = mapMenusToRoutes(userMenus)
      routes.forEach((route) => router.addRoute('main', route))
    }
  },
  actions: {
    async loginAction({ commit }, payload: ILogin) {
      // console.log('login action', payload.username)
      const {
        data: { id, token }
      } = await loginRequest(payload)
      commit('saveToken', token)
      localCache.setCache('token', token)
      // 请求用户信息
      const userInfoResult = await getUserInfo(id)
      commit('saveUserInfo', userInfoResult.data)
      localCache.setCache('userInfo', userInfoResult.data)
      // 请求用户菜单
      const userMenusResult = await getUserInMenus(userInfoResult.data.role.id)
      commit('saveUserMenus', userMenusResult.data)
      localCache.setCache('userMenus', userMenusResult.data)
      //跳转到首页
      await router.push('/main')
    },
    // phoneAction({ commit }, payload: any) {
    //   console.log('phone action')
    // }
    setupLocalLogin({ commit }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('saveToken', token)
      }

      const userInfo = localCache.getCache('userInfo')
      if (token) {
        commit('saveUserInfo', userInfo)
      }

      const userMenus = localCache.getCache('userMenus')
      if (token) {
        commit('saveUserMenus', userMenus)
      }
    }
  },
  getters: {}
}

export default loginModule

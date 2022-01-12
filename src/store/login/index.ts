import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { ILoginState } from '@/store/login/types'
import { getUserInfo, getUserInMenus, loginRequest } from '@/network/login'
import { ILogin } from '@/network/login/type'
import localCache from '@/utils/cache'
import router from '@/router'
import { mapMenusToRoutes, menuToPermission } from '@/utils/map-menus'
import store from '@/store'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: []
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

      // 获取用户按钮的权限
      const permissions = menuToPermission(userMenus)
      state.permissions = permissions
    }
  },
  actions: {
    async loginAction({ commit }, payload: ILogin) {
      // console.log('login action', payload.username)
      const {
        data: { id, token }
      } = await loginRequest(payload)
      commit('saveToken', token)
      localCache.setCache('token', token) // 存储到缓存
      // 请求所有部门跟角色
      store.dispatch('getInitialDataAction').then((h) => h)
      // 请求用户信息
      const userInfoResult = await getUserInfo(id)
      commit('saveUserInfo', userInfoResult.data)
      localCache.setCache('userInfo', userInfoResult.data) // 存储到缓存
      // 请求用户菜单
      const userMenusResult = await getUserInMenus(userInfoResult.data.role.id)
      commit('saveUserMenus', userMenusResult.data)
      localCache.setCache('userMenus', userMenusResult.data) // 存储到缓存
      // 跳转到首页
      await router.push('/main')
    },
    // 解决刷新页面vuex数据丢失的问题 -> 从缓存中重新读取
    setupLocalLogin({ commit, dispatch }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('saveToken', token)
        // 调用父级模块需要在第三个参数加上 { root: true }
        dispatch('getInitialDataAction', null, { root: true }).then((h) => h)
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

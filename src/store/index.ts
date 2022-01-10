import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootState, IStoreType } from './types'
import loginModule from './login'
import systemModule from './main/system'

const store = createStore<IRootState>({
  state() {
    return {
      name: '',
      age: 1
    }
  },
  mutations: {},
  actions: {},
  modules: {
    loginModule,
    systemModule
  }
})

export function setupStore() {
  store.dispatch('loginModule/setupLocalLogin').then((h) => h)
}

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store

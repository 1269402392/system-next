import { Module } from 'vuex'
import { IDashboardState } from '@/store/main/analysis/type'
import { IRootState } from '@/store/types'

import {
  getCategoryGoodsCount,
  getCategoryGoodsFavor,
  getCategoryGoodsSale,
  getAddressGoodsSale
} from '@/network/main/analysis/dashboard'

const dashboardModule: Module<IDashboardState, IRootState> = {
  namespaced: true,
  state() {
    return {
      categoryGoodsCount: [],
      categoryGoodsFavor: [],
      categoryGoodsSale: [],
      addressGoodsSale: []
    }
  },
  mutations: {
    changeCategoryCount(state, list: any) {
      state.categoryGoodsCount = list
    },
    changeCategorySale(state, list: any) {
      state.categoryGoodsSale = list
    },
    changeCategoryFavor(state, list: any) {
      state.categoryGoodsFavor = list
    },
    changeAddressSale(state, list: any) {
      state.addressGoodsSale = list
    }
  },
  actions: {
    async getDashboardDataAction({ commit }) {
      const { data: GoodsCount } = await getCategoryGoodsCount()
      commit('changeCategoryCount', GoodsCount)
      const { data: GoodsSale } = await getCategoryGoodsSale()
      commit('changeCategorySale', GoodsSale)
      const { data: GoodsFavor } = await getCategoryGoodsFavor()
      commit('changeCategoryFavor', GoodsFavor)
      const { data: AddressSale } = await getAddressGoodsSale()
      commit('changeAddressSale', AddressSale)
    }
  }
}

export default dashboardModule

import lyRequest from '@/network'

enum DashboardAPI {
  categoryGoodsCount = '/goods/category/count',
  categoryGoodsSale = '/goods/category/sale',
  categoryGoodsFavor = '/goods/category/favor',
  addressGoodsSale = '/goods/category/sale'
}

export function getCategoryGoodsCount() {
  return lyRequest.get({
    url: DashboardAPI.categoryGoodsCount,
    showLoading: false
  })
}

export function getCategoryGoodsSale() {
  return lyRequest.get({
    url: DashboardAPI.categoryGoodsSale,
    showLoading: false
  })
}

export function getCategoryGoodsFavor() {
  return lyRequest.get({
    url: DashboardAPI.categoryGoodsFavor,
    showLoading: false
  })
}

export function getAddressGoodsSale() {
  return lyRequest.get({
    url: DashboardAPI.addressGoodsSale,
    showLoading: false
  })
}

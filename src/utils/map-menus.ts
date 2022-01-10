import { RouteRecordRaw } from 'vue-router'
import { IBreadcrumb } from '@/components/nav-breadcrumb'

let firstPath: any = null

export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  // 返回过滤后的routes, 条件为 type === 2
  const routes: RouteRecordRaw[] = []

  // 保存所有的routes
  const allRoutes: RouteRecordRaw[] = []

  // 先去加载所有的routes
  const routeFiles = require.context('../router/main', true, /\.ts/)

  // routeFiles.keys() -> 返回文件模块数组
  routeFiles.keys().forEach((key) => {
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })

  const recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) routes.push(route)
        if (!firstPath) firstPath = menu
      } else {
        recurseGetRoute(menu.children)
      }
    }
  }

  // 根据菜单获取需要添加的routes
  recurseGetRoute(userMenus)

  return routes
}

export function pathMapBreadcrumb(userMenu: any[], currentPath: string) {
  const breadcrumb: IBreadcrumb[] = []
  pathMapToMenu(userMenu, currentPath, breadcrumb)
  return breadcrumb
}

export function pathMapToMenu(
  userMenu: any[],
  currentPath: string,
  breadcrumb?: IBreadcrumb[]
): any {
  for (const menu of userMenu) {
    if (menu.type === 2 && menu.url === currentPath) {
      return menu
    } else {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        breadcrumb?.push({ title: menu.name })

        breadcrumb?.push({ title: findMenu.name })
        return findMenu
      }
    }
  }
}

export { firstPath }

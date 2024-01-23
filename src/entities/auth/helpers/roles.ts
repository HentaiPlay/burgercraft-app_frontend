import { RouteRecordRaw, RouteLocationNormalized } from 'vue-router'
import { useUserStore } from '@/entities/user'

export function updatePagesPermissions(routes: readonly RouteRecordRaw[], to: RouteLocationNormalized) {
  const userStore = useUserStore()
  const permissions = userStore.role?.accessList?.pages

  // Обновляем meta во всех роутах
  for (const routeNumber in routes) {
    // Получаем название роута
    const routeName = routes[routeNumber].name
    // Перезаписываем meta тех страниц, которым на бэке задан доступ
    if (typeof routeName === 'string' && permissions && permissions[routeName] !== undefined) {
      routes[routeNumber].meta!.hasPermission = permissions[routeName]

      // При переопредлении meta роутов для пермишенов,
      // актульное состояние роутов доступно только в matches,
      // поэтому для текущего роута нужно перезаписывать meta (если роут корректный)
      if (to && to.name === routeName) {
        to.meta = to.matched[0].meta
      }
    }
  }
}

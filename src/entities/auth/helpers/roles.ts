import { RouteRecordRaw } from 'vue-router'

export const setPermissions = (routes: Array<RouteRecordRaw>, permissions: Record<string, boolean> | undefined) => {
  const result = routes.map((route) => {
    if (route.meta && permissions) {
      if (typeof route.name === 'string') {
        route.meta.hasPermission = permissions[route.name]
      }
    }
    return route
  })
  return result
}

import { RouteLocationNormalized, RouteRecordName } from 'vue-router'

export default async function PermissionMiddleware(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized
): Promise<void> {
  const hasPermission = to.meta.hasPermission
  const fromName = from?.name ? from.name : 'home'

  const redirectRouteName: RouteRecordName | null | undefined = hasPermission ? to.name : fromName

  return new Promise((resolve, reject) => {
    redirectRouteName?.toString() === to.name ? resolve() : reject(redirectRouteName?.toString())
  })
}

import { useRouter, RouteLocationNormalized, RouteRecordName } from 'vue-router'
import { routes } from '@/pages'
import { issetTokens } from '@/entities/auth/helpers/cookies'
import { useUserStore } from '@/entities/user'
import { useUserApi } from '@/entities/user'
import { updatePagesPermissions } from '@/entities/auth/helpers/roles'

export default async function AuthMiddleware(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized
): Promise<void> {
  const router = useRouter()
  const userStore = useUserStore()
  const hasTokens = issetTokens()
  const isAuthPath = to.name === 'auth'
  const issetRoute = routes.some((route) => to.name === route.name)

  // Если есть токены но нет данных о пользователе в сторе,
  // делаем запрос на их получение
  if (hasTokens && !userStore.hasInfo) {
    const userApi = useUserApi()
    await userApi
      .getUserInfo()
      .then((res) => userStore.setUserInfo(res.data))
      .catch(() => {})
      .finally(() => updatePagesPermissions(router.options.routes, to))
  }

  let redirectRouteName: RouteRecordName | null | undefined

  // Сценарии валидации
  switch (true) {
    // Если нет токенов и переход не в /auth, то отправляем именно туда
    case !hasTokens || !userStore.hasInfo:
      redirectRouteName = isAuthPath ? to.name : 'auth'
      break
    // Если несуществующий роут (404) или переход на /auth (будучи авторизованным)
    case hasTokens && isAuthPath:
    case !issetRoute:
      redirectRouteName = from.name ? from.name : 'home'
      break
    default:
      redirectRouteName = to.name
  }

  // После успешной авторизации устанавливаем доступы на страницы
  if (from.name === 'auth') {
    updatePagesPermissions(router.options.routes, to)
  }

  return new Promise((resolve, reject) => {
    redirectRouteName?.toString() === to.name ? resolve() : reject(redirectRouteName?.toString())
  })
}

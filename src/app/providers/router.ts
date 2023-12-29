import { createRouter, createWebHistory, RouteRecordName } from 'vue-router'
import { routes } from '@/pages'
import { useUIStateStore } from '@/shared/store/ui-state'
import { issetTokens } from '@/entities/auth/helpers/cookies'
import { useUserStore } from '@/entities/user/model/store'
import { useUserApi } from '@/entities/user'
import { setPermissions } from '@/entities/auth/helpers/roles'

export const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
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
      .finally(() => {
        router.options.routes = setPermissions(router.getRoutes(), userStore.role?.accessList?.pages)
        // При переопредлении meta роутов для пермишенов,
        // актульное состояние роутов доступно только в matches,
        // поэтому для текущего роута нужно перезаписывать meta
        to.meta = to.matched[0].meta
        to.meta.getInfo = true
      })
  }

  const hasPermission = to.meta.hasPermission

  let redirectRouteName: RouteRecordName | null | undefined

  // Сценарии валидации роутинга
  switch (true) {
    // Если нет токенов и переход не в /auth, то отправляем именно туда
    case !hasTokens:
      redirectRouteName = isAuthPath ? to.name : 'auth'
      break
    // Если несуществующий роут (404) или переход на /auth (будучи авторизованным)
    case hasTokens && isAuthPath:
    case !issetRoute:
      redirectRouteName = from.name ? from.name : 'home'
      break
    // Обычный сценарий с ролевым доступом
    default:
      redirectRouteName = hasPermission ? to.name : from?.name ? from.name : 'home'
  }

  // Включение прелоадера
  if (hasPermission) {
    const uiStore = useUIStateStore()
    uiStore.showPreloader()
  }

  // Редирект
  redirectRouteName?.toString() === to.name ? next() : next({ name: redirectRouteName?.toString() })
})

router.afterEach((to) => {
  // Установка заголовка
  const uiStore = useUIStateStore()
  uiStore.changeTitle(to.meta?.title)
})

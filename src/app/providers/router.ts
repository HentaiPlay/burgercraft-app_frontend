import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/pages'
import { useUIStateStore } from '@/shared/ui-state.store'
import { issetTokens } from '@/entities/auth/helpers/cookies.helper'

export const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  // Включение прелоадера
  const uiStore = useUIStateStore()
  uiStore.showPreloader()

  const hasTokens = issetTokens()
  const isAuthPath = to.name === 'auth'
  const issetRoute = routes.some((route) => to.name === route.name)
  const redirectPath = from?.name ? from.name : 'home'

  // Сценарии валидации роутинга
  switch (true) {
    // Если нет токенов и роут не auth
    case !hasTokens && !isAuthPath:
      next({ name: 'auth' })
      break
    // Если не токенов, но роут auth
    case !hasTokens && isAuthPath:
      next()
      break
    // Если есть токены, но роут auth, или роут не существует,
    // редиректим на предыдущий (если есть, иначе на главную страницу)
    case hasTokens && isAuthPath:
    case !issetRoute:
      next({ name: redirectPath })
      break
    default:
      next()

      // Установка заголовков
      document.title = typeof to.meta.title === 'string' ? to.meta.title : 'BurgerCraft'
  }
})

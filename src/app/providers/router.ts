import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/pages'
import { AuthMiddleware, PermissionMiddleware } from '../router'
import { useUIStateStore } from '@/shared/store/ui-state'

export const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  // Гвард роутинга миддлвейрами
  try {
    await AuthMiddleware(to, from)
    await PermissionMiddleware(to, from)
    next()
  } catch (redirectName) {
    next({ name: redirectName })
  }
  // Включаем прелоадер
  const uiStore = useUIStateStore()
  uiStore.showPreloader()
})

router.afterEach((to) => {
  const uiStore = useUIStateStore()
  // Выключаем прелоадер
  uiStore.hidePreloader()
  // Установка заголовка
  uiStore.changeTitle(to.meta?.title)
})

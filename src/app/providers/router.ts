import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/pages'
import { useUIStateStore } from '@/shared/ui-state.store'

export const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  // Включение прелоадеров
  const uiStore = useUIStateStore()
  uiStore.showPreloader()
  // Установка заголовков
  document.title = typeof to.meta.title === 'string' ? to.meta.title : 'BurgerCraft'
})

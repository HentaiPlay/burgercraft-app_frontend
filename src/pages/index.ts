import type { RouteRecordRaw } from 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title: string
    layout?: 'app' | 'default'
    isMenuItem?: boolean
    icon?: string
    hasPermission: boolean
  }
}

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('./home/HomePage.vue'),
    meta: {
      title: 'Профиль',
      layout: 'app',
      isMenuItem: true,
      icon: 'avatar',
      hasPermission: true
    }
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('./test/TestPage.vue'),
    meta: {
      title: 'Тестовая',
      layout: 'app',
      hasPermission: false
    }
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('./auth/AuthPage.vue'),
    meta: {
      title: 'Авторизация',
      hasPermission: true
    }
  },
  {
    path: '/orders',
    name: 'orders',
    component: () => import('./test/TestPage.vue'),
    meta: {
      title: 'Заказы',
      layout: 'app',
      isMenuItem: true,
      icon: 'list',
      hasPermission: false
    }
  },
  {
    path: '/products',
    name: 'products',
    component: () => import('./test/TestPage.vue'),
    meta: {
      title: 'Продукты',
      layout: 'app',
      isMenuItem: true,
      icon: 'fries',
      hasPermission: false
    }
  },
  {
    path: '/stats',
    name: 'stats',
    component: () => import('./test/TestPage.vue'),
    meta: {
      title: 'Статистика',
      layout: 'app',
      isMenuItem: true,
      icon: 'histogram',
      hasPermission: false
    }
  }
]

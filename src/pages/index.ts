import type { RouteRecordRaw } from 'vue-router'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('./home/HomePage.vue'),
    meta: {
      layout: 'app'
    }
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('./test/TestPage.vue'),
    meta: {
      title: 'Тестовая',
      layout: 'app'
    }
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('./auth/AuthPage.vue'),
    meta: {
      title: 'Авторизация'
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
      icon: 'list'
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
      icon: 'fries'
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
      icon: 'histogram'
    }
  }
]

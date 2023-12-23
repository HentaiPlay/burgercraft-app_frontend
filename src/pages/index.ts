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
      layout: 'app'
    }
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('./auth/AuthPage.vue')
  }
]

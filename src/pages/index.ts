import type { RouteRecordRaw } from 'vue-router'

export const routes: Array<RouteRecordRaw> = [
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

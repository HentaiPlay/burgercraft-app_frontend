import type { RouteRecordRaw } from 'vue-router'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'test',
    component: () => import('./test/TestPage.vue')
  }
]

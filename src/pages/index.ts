import type { RouteRecordRaw } from 'vue-router'
import { ProductsMiddleware } from '@/app/router'

declare module 'vue-router' {
  interface RouteMeta {
    title: string
    layout?: 'app' | 'default'
    isMenuItem?: boolean
    menuOptions?: {
      icon: string
      orderNumber: number
    }
    hasPermission: boolean
  }
}

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('./home/HomePage.vue'),
    meta: {
      title: 'routes.home',
      layout: 'app',
      isMenuItem: true,
      menuOptions: {
        icon: 'avatar',
        orderNumber: 1
      },
      hasPermission: true
    }
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('./test/TestPage.vue'),
    meta: {
      title: 'routes.test',
      layout: 'app',
      hasPermission: false
    }
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('./auth/AuthPage.vue'),
    meta: {
      title: 'routes.auth',
      hasPermission: true
    }
  },
  {
    path: '/orders',
    name: 'orders',
    component: () => import('./orders/OrdersPage.vue'),
    meta: {
      title: 'routes.orders',
      layout: 'app',
      isMenuItem: true,
      menuOptions: {
        icon: 'list',
        orderNumber: 2
      },
      hasPermission: false
    }
  },
  {
    path: '/products/:type?',
    name: 'products',
    component: () => import('./products/ProductsPage.vue'),
    meta: {
      title: 'routes.products',
      layout: 'app',
      isMenuItem: true,
      menuOptions: {
        icon: 'fries',
        orderNumber: 3
      },
      hasPermission: false
    },
    beforeEnter: [ProductsMiddleware]
  },
  {
    path: '/stats',
    name: 'stats',
    component: () => import('./stats/StatsPage.vue'),
    meta: {
      title: 'routes.stats',
      layout: 'app',
      isMenuItem: true,
      menuOptions: {
        icon: 'histogram',
        orderNumber: 4
      },
      hasPermission: false
    }
  }
]

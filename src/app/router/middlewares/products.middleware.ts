import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'

export default async function ProductsMiddleware(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  // Проверка на соответствие типа в параметре роута
  const type = to.params.type ? to.params.type.toString() : ''
  const param: string | string[] = from.name === 'products' ? from.params.type.toString() : ''
  // Редирект
  type && !['burger_ingredient', 'snack', 'sauce', 'drink'].includes(type)
    ? next({ name: 'products', params: { param: param } })
    : next()
}

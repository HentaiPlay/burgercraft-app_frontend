import { ProductTypeEnum } from '@/entities/products/model/types'

// Заказы
export enum StatusOrderEnum {
  ACCEPTED = 'accepted',
  COOKING = 'cooking',
  READY = 'ready',
  CANCELED = 'canceled'
}

export interface IOrderDTO {
  id: number
  price: number
  code: string
  status: StatusOrderEnum
  isSaled: boolean
  burgers: Array<IBurger>
  products: Array<IOrderProduct>
}

export interface IOrderListElement {
  id: number
  code: string
  status: StatusOrderEnum
  updatedAt: Date
}

export interface IOrderProduct {
  id: number
  type: ProductTypeEnum
  slug: string
  photoPath: string
  price: number
}

// Бургер (как подсущность)
export interface IBurger {
  price: number
  ingredients: Array<IBurgerIngredientOptions>
  orderId: number
}

export interface IBurgerIngredient {
  id: number
  burgerId: number
  ingredientId: number
}

export interface IBurgerIngredientOptions {
  id: number
  name: string
  type: ProductTypeEnum.INGREDIENT
  slug: string
  photoPath: string
  price: number
}

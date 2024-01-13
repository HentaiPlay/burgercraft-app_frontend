import { ProductTypeEnum } from '@/entities/products/model/types'

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

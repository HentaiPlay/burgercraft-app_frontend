import { ProductTypeEnum } from '@/entities/products/model/types'

export interface IBurgerDTO {
  price: number
  ingredients: IBurgerIngredientOptions[]
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

// Тип для формы
export interface IActiveBurgerDTO {
  id?: number
  price: number
  ingredients: IBurgerIngredientOptions[]
}

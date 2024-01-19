import { ProductTypeEnum } from '@/entities/products/model/types'

export interface IBurgerDTO {
  id?: number
  price: number
  ingredients: IBurgerIngredientOptions[]
  orderId?: number
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

// Для передачи данных
export interface ICreateBurgerDTO {
  price: number
  ingredients: IBurgerIngredientOptions[]
  orderId: number
}

export interface IUpdateBurgerDTO extends Required<ICreateBurgerDTO> {
  id: number
}

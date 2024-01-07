export enum ProductTypeEnum {
  INGREDIENT = 'burger_ingredient',
  SNACK = 'snack',
  SAUCE = 'sauce',
  DRINK = 'drink'
}

export type ProductType = 'burger_ingredient' | 'snack' | 'sauce' | 'drink'

export interface IProductDTO {
  id: number
  name: string
  type: ProductType
  slug: string
  photoPath: string
  price: number
}

export type Products = Record<string, IProductDTO[]>

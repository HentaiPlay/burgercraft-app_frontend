import { ProductTypeEnum } from '@/entities/products/model/types'
import { IBurger } from '@/entities/burger/model/types'

// Заказы
export enum StatusOrderEnum {
  ACCEPTED = 'accepted',
  COOKING = 'cooking',
  READY = 'ready',
  CANCELED = 'canceled'
}

// Типы получаемых данных
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

// Типы передаваемых данных
export interface ICreateOrderDTO {
  burgers: Pick<IOrderProduct, 'id' | 'slug' | 'type'>[]
  ordersProducts: Pick<IOrderProduct, 'id' | 'slug' | 'type'>[]
}

export interface IUpdateOrderDTO {
  id: number
  ordersProducts: Pick<IOrderProduct, 'id' | 'slug' | 'type'>[]
}

export interface IChangeStatusDTO {
  id: number
  status: StatusOrderEnum
}

import { ProductTypeEnum } from '@/entities/products/model/types'
import { IBurgerDTO } from '@/entities/burger/model/types'

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
  price?: number
  code?: string
  status: StatusOrderEnum
  isSaled?: boolean
  burgers: IBurgerDTO[]
  ordersProducts: Array<IOrderProduct>
}

export interface IOrderListElement {
  id: number
  code: string
  status: StatusOrderEnum
  updatedAt: Date
}

export interface IOrderProduct {
  id: number
  name: string
  type: ProductTypeEnum
  slug: string
  photoPath: string
  price: number
}

// Типы передаваемых данных
export interface ICreateOrderDTO {
  burgers: IBurgerDTO[]
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

// Тип для формы
export interface IActiveOrderDTO {
  id?: number | null
  price?: number
  burgers: IBurgerDTO[]
  ordersProducts: IOrderProduct[]
}

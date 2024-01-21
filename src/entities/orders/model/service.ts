import { useOrdersApi, useOrdersStore } from '@/entities/orders'
import { IChangeStatusDTO, ICreateOrderDTO, IUpdateOrderDTO } from './types'

export default function useOrdersService() {
  const ordersApi = useOrdersApi()
  const ordersStore = useOrdersStore()

  return {
    setOrderList: async () => {
      await ordersApi
        .getOrdersList()
        .then((res) => ordersStore.setOrderList(res.data))
        .catch((err) => console.log(err))
    },

    setOrder: async (id: number) => {
      await ordersApi
        .getOrder(id)
        .then((res) => ordersStore.setActiveOrder(res.data))
        .catch((err) => console.log(err))
    },

    createOrder: async (dto: ICreateOrderDTO) => {
      await ordersApi.createOrder(dto).catch((err) => console.log(err))
    },

    editOrder: async (dto: IUpdateOrderDTO) => {
      await ordersApi.updateOrder(dto).catch((err) => console.log(err))
    },

    changeStatus: async (dto: IChangeStatusDTO) => {
      await ordersApi.changeStatus(dto).catch((err) => console.log(err))
    }
  }
}

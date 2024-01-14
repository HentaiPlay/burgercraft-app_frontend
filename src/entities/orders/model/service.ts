import { useOrdersApi, useOrdersStore } from '@/entities/orders'

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
    }
  }
}

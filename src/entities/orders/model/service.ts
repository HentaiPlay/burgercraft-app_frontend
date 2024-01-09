import { useOrdersApi, useOrdersStore } from '@/entities/orders'

export default function useOrdersService() {
  const ordersApi = useOrdersApi()
  const ordersStore = useOrdersStore()

  return {
    setOrders: async () => {
      await ordersApi
        .getOrdersList()
        .then((res) => ordersStore.setOrders(res.data))
        .catch((err) => console.log(err))
    }
  }
}

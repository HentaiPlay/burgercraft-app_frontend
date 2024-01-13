import { useBurgerApi } from '@/entities/burger'

export default function useBurgerService() {
  const ordersApi = useBurgerApi()

  return {
    getBurger: async (id: number) => {
      return await ordersApi.getBurger(id)
    }
  }
}

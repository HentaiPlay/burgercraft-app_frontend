import apiClient from '@/app/providers/axios'

// TODO: добавить запросы
export default function useBurgerApi() {
  return {
    getBurger: async (id: number) => await apiClient.get(`burgers/${id}`)
  }
}

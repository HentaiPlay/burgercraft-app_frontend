import apiClient from '@/app/providers/axios'
import { IBurgerDTO } from '../model/types'

export default function useBurgerApi() {
  return {
    getBurger: async (id: number) => await apiClient.get(`burgers/${id}`),

    editBurger: async (dto: IBurgerDTO) => await apiClient.patch('burgers', dto),

    removeBurger: async (id: number) => await apiClient.delete('burgers', { data: { id: id } })
  }
}

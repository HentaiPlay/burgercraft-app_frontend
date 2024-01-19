import apiClient from '@/app/providers/axios'
import { ICreateBurgerDTO, IUpdateBurgerDTO } from '../model/types'

export default function useBurgerApi() {
  return {
    getBurger: async (id: number) => await apiClient.get(`burgers/${id}`),

    createBurger: async (dto: ICreateBurgerDTO) => await apiClient.post('burgers', dto),

    editBurger: async (dto: IUpdateBurgerDTO) => await apiClient.patch('burgers', dto),

    removeBurger: async (id: number) => await apiClient.delete('burgers', { data: { id: id } })
  }
}

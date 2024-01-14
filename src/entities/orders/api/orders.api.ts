import apiClient from '@/app/providers/axios'
import { ICreateOrderDTO, IUpdateOrderDTO, IChangeStatusDTO } from '../model/types'

export default function useOrdersApi() {
  return {
    getOrdersList: async () => await apiClient.get('orders/list'),

    getOrder: async (id: number) => await apiClient.get(`orders/${id}`),

    createOrder: async (dto: ICreateOrderDTO) => await apiClient.post('orders', dto),

    updateOrder: async (dto: IUpdateOrderDTO) => await apiClient.patch('orders', dto),

    changeStatus: async (dto: IChangeStatusDTO) => await apiClient.put('orders/status', dto)
  }
}

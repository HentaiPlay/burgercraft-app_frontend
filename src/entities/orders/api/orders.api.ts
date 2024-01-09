import apiClient from '@/app/providers/axios'

export default function useOrdersApi() {
  return {
    getOrdersList: async () => await apiClient.get('orders/list')
  }
}

import apiClient from '@/app/providers/axios'

export default function useProductsApi() {
  return {
    getProducts: async () => await apiClient.get('products')
  }
}

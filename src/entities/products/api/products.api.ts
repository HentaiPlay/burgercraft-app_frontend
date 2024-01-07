import apiClient from '@/app/providers/axios'
import { ICreateProductDTO } from '../model/types'

export default function useProductsApi() {
  return {
    getProducts: async () => await apiClient.get('products'),

    createProduct: async (dto: ICreateProductDTO) => await apiClient.post('products', dto),

    updateProduct: async (dto: Omit<ICreateProductDTO, 'type'>) => await apiClient.patch('prosucts', dto),

    uploadPicture: async (dto: FormData) =>
      await apiClient.put('products/photo', dto, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
  }
}

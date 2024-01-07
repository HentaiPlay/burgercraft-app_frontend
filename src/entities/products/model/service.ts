import { useProductsStore } from '..'
import { useProductsApi } from '@/entities/products'
import { IProductDTO } from './types'

export default function useUserService() {
  const productsStore = useProductsStore()
  const productsApi = useProductsApi()

  return {
    getProducts: async (): Promise<IProductDTO[] | void> => {
      return await productsApi
        .getProducts()
        .then((res) => productsStore.setAllProducts(res.data))
        .catch((err) => console.log(err))
    }
  }
}

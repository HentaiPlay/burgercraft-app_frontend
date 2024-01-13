import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { ProductType, IProductDTO, Products, ProductTypeEnum } from './types'

export const useProductsStore = defineStore('products', () => {
  const types = ref<ProductType[]>([])
  const products = ref<Products>({})
  const numberOfProductTypes = Object.values(ProductTypeEnum).length

  const hasData = computed(() => Object.keys(products.value).length === numberOfProductTypes)
  const brioches = computed(() => products.value.burger_ingredient?.filter((e) => [1, 2].includes(e.id)))
  const burgerIngredients = computed(() => products.value.burger_ingredient?.filter((e) => ![1, 2].includes(e.id)))

  function setAllProducts(dto: IProductDTO[]) {
    types.value = []
    products.value = {}
    dto.forEach((product: IProductDTO) => {
      // Разбиваем по типам
      if (!types.value.includes(product.type)) {
        types.value.push(product.type)
        products.value[product.type] = []
      }
      products.value[product.type].push(product)
    })
  }

  return { products, brioches, burgerIngredients, hasData, setAllProducts }
})

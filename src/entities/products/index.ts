import ProductCard from './ui/ProductCard.vue'
import ProductTypeCard from './ui/ProductTypeCard.vue'
import ProductTypeFilter from './ui/ProductTypeFilter.vue'
import ProductForm from './ui/ProductForm.vue'
import IngredientList from './ui/IngredientList.vue'
import OrdersProductsList from './ui/OrdersProductsList.vue'
import useProductsApi from './api/products.api'
import { useProductsStore } from './model/store'
import useProductsService from './model/service'
export {
  ProductCard,
  ProductTypeCard,
  ProductTypeFilter,
  ProductForm,
  IngredientList,
  OrdersProductsList,
  useProductsStore,
  useProductsApi,
  useProductsService
}

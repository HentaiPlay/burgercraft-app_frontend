import OrdersTable from './ui/OrdersTable.vue'
import OrderForm from './ui/OrderForm.vue'
import OrdersProductsConstructor from './ui/OrdersProductsConstructor.vue'
import OrderStatusSwitcher from './ui/OrderStatusSwitcher.vue'
import useOrdersApi from './api/orders.api'
import { useOrdersStore } from './model/store'
import useOrdersService from './model/service'
export {
  OrdersTable,
  OrderForm,
  OrdersProductsConstructor,
  OrderStatusSwitcher,
  useOrdersApi,
  useOrdersStore,
  useOrdersService
}

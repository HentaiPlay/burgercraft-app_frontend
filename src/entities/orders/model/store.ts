import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { cloneDeep } from 'lodash'
import { IActiveOrderDTO, IOrderDTO, IOrderListElement, IOrderProduct } from './types'
import { IBurgerDTO } from '@/entities/burger/model/types'

export const useOrdersStore = defineStore('orders', () => {
  const temaplteActiveOrder: IActiveOrderDTO = {
    burgers: [],
    ordersProducts: []
  }
  const orderList = ref<IOrderListElement[]>([])
  const activeOrder = ref<IActiveOrderDTO>(cloneDeep(temaplteActiveOrder))

  const hasOrderListData = computed(() => !!orderList.value.length)
  const hasActiveOrderData = computed(() => activeOrder.value.burgers.length || activeOrder.value.ordersProducts.length)

  function setOrderList(dto: IOrderListElement[]) {
    orderList.value = dto
  }

  function setActiveOrder(dto: IOrderDTO) {
    activeOrder.value = dto
  }

  // Бургер
  function addBurger(dto: IBurgerDTO) {
    activeOrder.value.burgers.push(dto)
  }
  function removeBurger(index: number) {
    delete activeOrder.value.burgers[index]
    activeOrder.value.burgers = activeOrder.value.burgers.filter(Boolean)
  }

  // Продукты к заказу
  function addOrdersProduct(dto: IOrderProduct) {
    activeOrder.value?.ordersProducts.push(dto)
  }
  function removeOrdersProduct(index: number) {
    delete activeOrder.value.ordersProducts[index]
    activeOrder.value.ordersProducts = activeOrder.value.ordersProducts.filter(Boolean)
  }

  function clearActiveOrder() {
    activeOrder.value = cloneDeep(temaplteActiveOrder)
  }

  function clearState() {
    orderList.value = []
    clearActiveOrder()
  }

  return {
    orderList,
    activeOrder,
    hasOrderListData,
    hasActiveOrderData,
    setOrderList,
    setActiveOrder,
    addBurger,
    removeBurger,
    addOrdersProduct,
    removeOrdersProduct,
    clearActiveOrder,
    clearState
  }
})

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { cloneDeep } from 'lodash'
import { IActiveOrderDTO, IOrderListElement, IOrderProduct } from './types'
import { IBurgerDTO } from '@/entities/burger/model/types'

export const useOrdersStore = defineStore('orders', () => {
  const temaplteActiveOrder: IActiveOrderDTO = {
    price: 0,
    burgers: [],
    ordersProducts: []
  }
  const orderList = ref<IOrderListElement[]>([])
  const activeOrder = ref<IActiveOrderDTO>(cloneDeep(temaplteActiveOrder))
  const oldOrder = ref<IActiveOrderDTO>(cloneDeep(temaplteActiveOrder))

  const hasOrderListData = computed(() => !!orderList.value.length)
  const hasActiveOrderData = computed(() => activeOrder.value.burgers.length || activeOrder.value.ordersProducts.length)

  function setOrderList(dto: IOrderListElement[]) {
    orderList.value = dto
  }

  function setActiveOrder(dto: IActiveOrderDTO) {
    activeOrder.value = dto
    oldOrder.value = cloneDeep(dto)
  }

  // Бургеры
  function addBurger(dto: IBurgerDTO) {
    activeOrder.value.burgers.push(dto)
    countPrice()
  }
  function editBurger(dto: IBurgerDTO, index: number) {
    activeOrder.value.burgers[index] = dto
    countPrice()
  }
  function removeBurger(index: number) {
    delete activeOrder.value.burgers[index]
    activeOrder.value.burgers = activeOrder.value.burgers.filter(Boolean)
    countPrice()
  }

  // Продукты к заказу
  function addOrdersProduct(dto: IOrderProduct) {
    activeOrder.value?.ordersProducts.push(dto)
    countPrice()
  }
  function removeOrdersProduct(index: number) {
    delete activeOrder.value.ordersProducts[index]
    activeOrder.value.ordersProducts = activeOrder.value.ordersProducts.filter(Boolean)
    countPrice()
  }

  // Пересчет стоимости
  function countPrice() {
    activeOrder.value.price = 0
    activeOrder.value.price += activeOrder.value.burgers.reduce((totalPrice, burger) => {
      totalPrice += burger.price
      return totalPrice
    }, 0)
    activeOrder.value.price += activeOrder.value.ordersProducts.reduce((totalPrice, product) => {
      totalPrice += product.price
      return totalPrice
    }, 0)
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
    oldOrder,
    hasOrderListData,
    hasActiveOrderData,
    setOrderList,
    setActiveOrder,
    addBurger,
    editBurger,
    removeBurger,
    addOrdersProduct,
    removeOrdersProduct,
    clearActiveOrder,
    clearState
  }
})

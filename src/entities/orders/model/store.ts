import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { IOrderDTO, IOrderListElement } from './types'

export const useOrdersStore = defineStore('orders', () => {
  const orderList = ref<IOrderListElement[]>([])
  const activeOrder = ref<IOrderDTO>()

  const hasOrderListData = computed(() => !!orderList.value.length)

  function setOrderList(dto: IOrderListElement[]) {
    orderList.value = dto
  }

  function setActiveOrder(dto: IOrderDTO) {
    activeOrder.value = dto
  }

  function clearActiveOrder() {
    activeOrder.value = undefined
  }

  function clearState() {
    orderList.value = []
    clearActiveOrder()
  }

  return { orderList, activeOrder, hasOrderListData, setOrderList, setActiveOrder, clearActiveOrder, clearState }
})

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { IOrderListElement } from './types'

export const useOrdersStore = defineStore('orders', () => {
  const orders = ref<IOrderListElement[]>([])

  const hasData = computed(() => !!orders.value.length)

  function setOrders(dto: IOrderListElement[]) {
    orders.value = dto
  }

  return { orders, hasData, setOrders }
})

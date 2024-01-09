<script setup lang="ts">
  import { onMounted } from 'vue'
  import { OrdersTable } from '@/entities/orders'
  import { useOrdersStore, useOrdersService } from '@/entities/orders'

  const ordersStore = useOrdersStore()
  const ordersService = useOrdersService()

  onMounted(async () => {
    if (!ordersStore.hasData) {
      await ordersService.setOrders()
    }
  })
</script>

<template>
  <OrdersTable :orders="ordersStore.orders" />
</template>

<style lang="scss" scoped></style>

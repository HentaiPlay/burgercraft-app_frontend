<script setup lang="ts">
  import { onMounted } from 'vue'
  import { OrdersTable, OrderForm, useOrdersStore, useOrdersService } from '@/entities/orders'

  const ordersStore = useOrdersStore()
  const ordersService = useOrdersService()

  onMounted(async () => {
    if (!ordersStore.hasOrderListData) {
      await ordersService.setOrderList()
    }
  })
</script>

<template>
  <div class="panel">
    <!-- Предупреждение -->
    <div class="panel__warning">
      <el-icon><WarnTriangleFilled /></el-icon>
      <span>{{ $t('orders.info') }}</span>
    </div>
    <OrderForm mode="create" />
  </div>

  <!-- Таблица заказов -->
  <OrdersTable />
</template>

<style lang="scss" scoped>
  .panel {
    @include mixins.mb(20px);
    @include mixins.pb(20px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    border-bottom: solid 1px colors.$bg-color-overlay;
  }
  .panel__warning {
    display: flex;
    align-items: center;
    i {
      font-size: 1.4em;
      @include mixins.mr(10px);
    }
    span,
    i {
      color: colors.$warning !important;
    }
  }
  .order-list {
    display: flex;
  }
</style>

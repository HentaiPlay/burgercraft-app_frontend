<script setup lang="ts">
  import { onMounted } from 'vue'
  import { useUserStore } from '@/entities/user'
  import { OrdersTable, OrderForm, useOrdersStore, useOrdersService } from '@/entities/orders'

  const ordersStore = useOrdersStore()
  const ordersService = useOrdersService()
  const userStore = useUserStore()

  onMounted(async () => {
    if (!ordersStore.hasOrderListData) {
      await ordersService.setOrderList()
    }
  })
</script>

<template>
  <div class="panel">
    <!-- Справочная информация -->
    <div class="panel__info">
      <el-icon><InfoFilled /></el-icon>
      <span v-html="$t('orders.info')"></span>
    </div>
    <OrderForm
      v-if="userStore.role?.accessList.interfaces.orders.create"
      mode="create"
    />
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
    align-items: start;
    border-bottom: solid 1px colors.$bg-color-overlay;
  }
  .panel__info {
    display: flex;
    align-items: start;
    @include mixins.mr(20px);
    i {
      @include mixins.mr(10px);
    }
    span,
    i {
      font-size: 0.9rem;
      color: colors.$primary !important;
      line-height: 1.2rem;
    }
  }
  .order-list {
    display: flex;
  }
</style>

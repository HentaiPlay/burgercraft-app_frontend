<script setup lang="ts">
  import { computed } from 'vue'
  import { IOrderListElement, StatusOrderEnum } from '@/entities/orders/model/types'

  const props = defineProps<{ orders: IOrderListElement[] }>()

  const getOrders = computed(() => (status: StatusOrderEnum) => {
    return props.orders.filter((order) => order.status === status)
  })
  const getColor = computed(() => (status: StatusOrderEnum) => {
    switch (status) {
      case StatusOrderEnum.ACCEPTED:
        return 'primary'
      case StatusOrderEnum.COOKING:
        return 'warning'
      case StatusOrderEnum.READY:
        return 'success'
      case StatusOrderEnum.CANCELED:
        return 'danger'
    }
  })
</script>

<template>
  <div class="orders-table">
    <div
      v-for="status in StatusOrderEnum"
      :key="status"
      class="order-table__column"
    >
      <!-- Список заказов -->
      <div class="column__item">
        <!-- Заголовок -->
        <div class="item__title">
          <el-text :type="getColor(status)">
            <b>{{ $t(`orders.status.${status}`) }}</b>
          </el-text>
        </div>
        <!-- Номер заказа -->
        <div
          v-for="order in getOrders(status)"
          :key="order.id"
          class="item"
        >
          <span>{{ order.code }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .orders-table {
    width: 460px;
    height: 250px;
    max-height: 250px;
    display: grid;
    align-items: start;
    justify-items: center;
    grid-template-columns: repeat(4, 1fr);
    border: 2px solid colors.$bg-color-page;
    overflow: hidden;
    border-radius: 10px;
    @include mixins.no__copy();
  }
  .order-table__column {
    width: 100%;
    height: 100%;
    &:not(:last-child) {
      border-right: 2px solid colors.$bg-color-page;
    }
  }
  .item__title {
    display: flex;
    align-items: center;
    justify-content: center;
    @include mixins.py(1em);
    @include mixins.mb(10px);
    background-color: colors.$bg-color-page;
  }
  .item {
    display: flex;
    width: 100%;
    justify-content: center;
    @include mixins.pb(10px);
  }
</style>

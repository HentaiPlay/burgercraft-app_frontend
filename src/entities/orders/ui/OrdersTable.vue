<script setup lang="ts">
  import { computed } from 'vue'
  import { Select, Timer, Dish, CloseBold } from '@element-plus/icons-vue'
  import { OrderForm, OrderStatusSwitcher, useOrdersStore } from '@/entities/orders'
  import { StatusOrderEnum } from '@/entities/orders/model/types'

  const ordersStore = useOrdersStore()

  const icon = computed(() => (status: StatusOrderEnum) => {
    switch (status) {
      case StatusOrderEnum.ACCEPTED:
        return Select
      case StatusOrderEnum.COOKING:
        return Timer
      case StatusOrderEnum.READY:
        return Dish
      case StatusOrderEnum.CANCELED:
        return CloseBold
      default:
        return ''
    }
  })

  const color = computed(() => (status: StatusOrderEnum) => {
    switch (status) {
      case StatusOrderEnum.ACCEPTED:
        return 'info'
      case StatusOrderEnum.COOKING:
        return 'warning'
      case StatusOrderEnum.READY:
        return 'success'
      case StatusOrderEnum.CANCELED:
        return 'danger'
      default:
        return ''
    }
  })
</script>

<template>
  <el-table :data="ordersStore.orderList">
    <!-- Код заказа -->
    <el-table-column
      :label="$t('orders.table.code')"
      prop="code"
      width="100"
    />

    <!-- Статус -->
    <el-table-column
      :label="$t('orders.table.status')"
      width="200"
    >
      <template #default="scope">
        <el-tag
          :type="color(scope.row.status)"
          disable-transitions
        >
          <el-icon><component :is="icon(scope.row.status)" /></el-icon>
          {{ $t(`orders.status.${scope.row.status}`) }}
        </el-tag>
      </template>
    </el-table-column>

    <!-- Дата последнего обновления -->
    <el-table-column
      :label="$t('orders.table.updatedAt')"
      width="300"
    >
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-icon><timer /></el-icon>
          <span style="margin-left: 10px">
            {{ new Date(scope.row.updatedAt).toLocaleString() }}
          </span>
        </div>
      </template>
    </el-table-column>

    <!-- Действия -->
    <el-table-column
      :label="$t('orders.table.actions')"
      prop="id"
      align="right"
    >
      <template #default="scope">
        <!-- Смена статуса -->
        <OrderStatusSwitcher
          :id="scope.row.id"
          :status="scope.row.status"
        />
        <!-- Редактировать -->
        <OrderForm
          mode="edit"
          :order-id="scope.row.id"
          :status="scope.row.status"
        />
      </template>
    </el-table-column>
  </el-table>
</template>

<style lang="scss"></style>

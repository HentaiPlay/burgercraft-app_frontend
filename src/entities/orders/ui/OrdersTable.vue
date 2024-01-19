<script setup lang="ts">
  import { computed } from 'vue'
  import { Select, Timer, Dish, CloseBold } from '@element-plus/icons-vue'
  import { OrderForm, useOrdersStore } from '@/entities/orders'
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
    <!-- Статус -->
    <el-table-column :label="$t('orders.table.status')">
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

    <!-- Код заказа -->
    <el-table-column
      :label="$t('orders.table.code')"
      prop="code"
    />

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

    <!-- Редактировать -->
    <el-table-column
      :label="$t('orders.table.actions')"
      prop="id"
      align="right"
    >
      <template #default="scope">
        <OrderForm
          mode="edit"
          :order-id="scope.row.id"
        />
      </template>
    </el-table-column>
  </el-table>
</template>

<style lang="scss"></style>

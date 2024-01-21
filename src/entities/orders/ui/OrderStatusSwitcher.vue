<script setup lang="ts">
  import { ref, unref, computed } from 'vue'
  import { ClickOutside as vClickOutside } from 'element-plus'
  import { List, Timer, Dish, CloseBold } from '@element-plus/icons-vue'
  import { global, useMyConfirmDialog } from '@/shared/composables'
  import { useOrdersService } from '@/entities/orders'
  import { StatusOrderEnum } from '../model/types'

  const popoverRef = ref()
  const onClickOutside = () => {
    unref(popoverRef).popperRef?.delayHide?.()
  }

  const props = defineProps<{
    id: number
    status: StatusOrderEnum
  }>()

  const confirmDialog = useMyConfirmDialog()
  const ordersService = useOrdersService()

  const nextStatus = computed(() => {
    switch (props.status) {
      case StatusOrderEnum.ACCEPTED:
        return StatusOrderEnum.COOKING
      case StatusOrderEnum.COOKING:
        return StatusOrderEnum.READY
      default:
        return StatusOrderEnum.ACCEPTED
    }
  })

  const icon = computed(() => (status: StatusOrderEnum) => {
    switch (status) {
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

  const disabled = computed(() => [StatusOrderEnum.READY, StatusOrderEnum.CANCELED].includes(props.status))

  const setStatus = async (status: StatusOrderEnum) => {
    const statusName = global.i18n?.t(`orders.status.${status}`) ?? status
    const message = global.i18n?.t('orders.switchStatus.confirm', { status: statusName }) ?? status
    confirmDialog({
      message: message,
      onConfirm: async () => {
        await ordersService.changeStatus({
          id: props.id,
          status: status
        })
        await ordersService.setOrderList()
      }
    })
  }
</script>

<template>
  <el-button
    v-click-outside="onClickOutside"
    :disabled="disabled"
    v-popover="popoverRef"
    :icon="List"
    size="small"
  >
    {{ $t(`orders.switchStatus.button`) }}
  </el-button>

  <!-- Окно с выбором статуса -->
  <el-popover
    ref="popoverRef"
    trigger="click"
    virtual-triggering
    persistent
    width="100"
  >
    <div class="switch-status">
      <!-- Следующий статус -->
      <div class="switch-status__button">
        <el-button
          @click="setStatus(nextStatus)"
          size="small"
          :icon="icon(nextStatus)"
          :type="color(nextStatus)"
          plain
        >
          {{ $t(`orders.status.${nextStatus}`) }}
        </el-button>
      </div>

      <!-- Отменить заказ -->
      <div
        v-if="props.status === StatusOrderEnum.ACCEPTED"
        class="switch-status__button"
      >
        <el-button
          @click="setStatus(StatusOrderEnum.CANCELED)"
          size="small"
          :icon="CloseBold"
          type="danger"
          plain
        >
          {{ $t(`orders.status.${StatusOrderEnum.CANCELED}`) }}
        </el-button>
      </div>
    </div>
  </el-popover>
</template>

<style lang="scss" scoped>
  .switch-status {
    display: grid;
    gap: 10px;
    justify-items: center;
    justify-content: center;
  }
  .switch-status__button {
    display: flex;
    justify-content: center;
    width: 100%;
  }
</style>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { CirclePlus, Edit } from '@element-plus/icons-vue'
  import { useOrdersStore, useOrdersService } from '@/entities/orders'

  const ordersStore = useOrdersStore()
  const ordersService = useOrdersService()

  const props = defineProps<{
    mode: 'create' | 'edit'
    orderId?: number
  }>()

  const icon = computed(() => {
    switch (props.mode) {
      case 'create':
        return CirclePlus
      case 'edit':
        return Edit
      default:
        return CirclePlus
    }
  })

  // Модальное окно
  const dialog = ref<boolean>(false)

  const open = async () => {
    if (props.mode === 'edit') {
      if (!props.orderId) return
      await ordersService.setOrder(props.orderId)
    }
    dialog.value = true
  }

  const close = () => {
    ordersStore.clearActiveOrder()
    dialog.value = false
  }
</script>

<template>
  <!-- Кнопка создания -->
  <el-button
    @click="open"
    :icon="icon"
  >
    {{ $t(`orders.form.${props.mode}.button`) }}
  </el-button>

  <!-- Модальное окно формы -->
  <el-dialog
    v-model="dialog"
    :title="$t(`orders.form.${props.mode}.title`)"
    width="900px"
    draggable
    @close="close"
  >
    <!-- Форма -->
    <div
      v-if="dialog"
      class="order-form"
    ></div>
  </el-dialog>
</template>

<style lang="scss" scoped>
  .order-form {
    border: 1px solid red;
  }
</style>

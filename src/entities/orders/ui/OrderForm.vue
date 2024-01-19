<script setup lang="ts">
  import { ref, computed, onUnmounted } from 'vue'
  import { CirclePlus, Edit } from '@element-plus/icons-vue'
  import { useOrdersStore, useOrdersService, OrdersProductsConstructor } from '@/entities/orders'
  import { OrdersProductsList } from '@/entities/products'
  import { BurgerList, BurgerForm } from '@/entities/burger'

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

  onUnmounted(() => ordersStore.clearActiveOrder())
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
  <teleport to="body">
    <el-dialog
      v-model="dialog"
      :title="$t(`orders.form.${props.mode}.title`)"
      width="900px"
      top="8vh"
      @close="close"
    >
      <!-- Форма -->
      <div
        v-if="dialog"
        class="order-form"
      >
        <div class="order-form__lists">
          <BurgerList />
          <div class="lists__burger-action">
            <BurgerForm mode="create" />
          </div>
          <OrdersProductsConstructor />
        </div>
        <OrdersProductsList />
      </div>
    </el-dialog>
  </teleport>
</template>

<style lang="scss" scoped>
  .order-form {
    display: flex;
    justify-content: space-between;
  }
  .order-form__lists {
    @include mixins.mr(20px);
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: space-between;
  }
  .lists__burger-action {
    display: flex;
    align-items: center;
    justify-content: center;
    @include mixins.py(10px);
  }
</style>

<script setup lang="ts">
  import { ref, computed, onUnmounted } from 'vue'
  import { differenceWith, isEqual } from 'lodash'
  import { CirclePlus, Edit } from '@element-plus/icons-vue'
  import { global, useMyConfirmDialog } from '@/shared/composables'
  import { useOrdersStore, useOrdersService, OrdersProductsConstructor } from '@/entities/orders'
  import { OrdersProductsList } from '@/entities/products'
  import { BurgerList, BurgerForm } from '@/entities/burger'

  const confirmDialog = useMyConfirmDialog()
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

  // Кнопка сохранения
  const hasChanges = computed(() => {
    if (ordersStore.oldOrder.ordersProducts.length === ordersStore.activeOrder.ordersProducts.length) {
      return differenceWith(ordersStore.oldOrder.ordersProducts, ordersStore.activeOrder.ordersProducts, isEqual).length
    }
    return ordersStore.activeOrder.ordersProducts.length !== ordersStore.oldOrder.ordersProducts.length
  })
  const disabled = computed(() => {
    const correctBurgersLength: boolean = ordersStore.activeOrder.burgers.length >= 1
    return !correctBurgersLength || (!hasChanges.value && props.mode === 'edit')
  })

  const save = async () => {
    const message = global.i18n?.t('orders.form.edit.confirm') ?? ''
    switch (props.mode) {
      // Создать заказ
      case 'create':
        await ordersService.createOrder(ordersStore.activeOrder)
        await ordersService.setOrderList()
        close()
        break
      // Изменить заказ
      case 'edit':
        confirmDialog({
          message: message,
          onConfirm: async () => {
            if (props.orderId)
              await ordersService.editOrder({
                id: props.orderId,
                ordersProducts: ordersStore.activeOrder.ordersProducts
              })
            await ordersService.setOrderList()
            close()
          }
        })
        break
    }
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
        <div class="order-form__body">
          <div class="order-form__lists">
            <!-- Список бургеров и кнпока создания -->
            <BurgerList />
            <div class="lists__burger-action">
              <BurgerForm mode="create" />
            </div>
            <!-- Конструктор продуктов -->
            <OrdersProductsConstructor />
          </div>
          <!-- Список продуктов -->
          <OrdersProductsList />
        </div>

        <!-- Стоимость и сохранить -->
        <div class="order-form__action">
          <div>
            <span>{{ $t('orders.form.price', { number: ordersStore.activeOrder.price }) }}</span>
          </div>
          <el-button
            type="success"
            :disabled="disabled"
            @click="save"
          >
            {{ $t(`orders.form.${props.mode}.saveButton`) }}
          </el-button>
        </div>
      </div>
    </el-dialog>
  </teleport>
</template>

<style lang="scss" scoped>
  .order-form {
    display: flex;
    flex-direction: column;
    @include mixins.no__copy();
  }
  .order-form__body {
    display: flex;
    justify-content: space-between;
  }
  .order-form__action {
    @include mixins.pt(10px);
    @include mixins.mt(10px);
    display: flex;
    justify-content: space-between;
    border-top: 1px solid colors.$bg-color-overlay;
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

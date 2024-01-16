<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'
  import { Burger } from '@element-plus/icons-vue'
  import { BurgerConstructor } from '@/entities/burger'
  import { IngredientList } from '@/entities/products'
  import { useProductsStore, useProductsService } from '@/entities/products'
  import { useBurgerStore } from '@/entities/burger'
  import { IBurgerDTO } from '../model/types'

  const productsStore = useProductsStore()
  const productsService = useProductsService()
  const burgerStore = useBurgerStore()

  const props = defineProps<{
    mode: 'create' | 'edit'
    burger?: IBurgerDTO
  }>()

  const dialog = ref<boolean>(false)
  const open = () => {
    if (props.mode === 'edit' && props.burger) {
      burgerStore.setBurger(props.burger)
    }
    dialog.value = true
  }
  const close = () => {
    burgerStore.clearState()
    dialog.value = false
  }

  const disabled = computed(() => burgerStore.ingredients.length < 6 || burgerStore.ingredients.length > 15)
  const save = () => console.log('save')

  onMounted(async () => {
    if (!productsStore.hasData) {
      await productsService.setProducts()
    }
  })
</script>

<template>
  <el-button
    @click="open"
    :icon="Burger"
  >
    {{ $t(`burger.form.${props.mode}.button`) }}
  </el-button>

  <el-dialog
    v-model="dialog"
    :title="$t(`burger.form.${props.mode}.title`)"
    width="600px"
    top="8vh"
    draggable
    @close="close"
  >
    <div
      v-if="productsStore.hasData && dialog"
      class="burger-form"
    >
      <!-- Конструктор бургера -->
      <div class="burger-form__body">
        <BurgerConstructor />
        <IngredientList />
      </div>

      <div class="burger-form__action">
        <!-- Стоимость и сообщение о правилах валидации -->
        <div>
          <p>{{ $t('burger.form.price') }}: {{ burgerStore.burger.price }}</p>
          <p v-if="disabled">{{ $t('rules.min_max', { min: 6, max: 15 }) }}</p>
        </div>
        <!-- Сохранить -->
        <el-button
          @click="save"
          :disabled="disabled"
          type="success"
        >
          {{ $t(`burger.form.${props.mode}.saveButton`) }}
        </el-button>
      </div>
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped>
  .burger-form {
    display: flex;
    flex-direction: column;
  }
  .burger-form__body {
    display: flex;
    justify-content: space-between;
  }
  .burger-form__action {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>

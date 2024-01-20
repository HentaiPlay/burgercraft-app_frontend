<script setup lang="ts">
  import { ref, computed, onMounted, onUnmounted } from 'vue'
  import { isEqual } from 'lodash'
  import { Burger } from '@element-plus/icons-vue'
  import { useBurgerStore, useBurgerService, BurgerConstructor } from '@/entities/burger'
  import { useProductsStore, useProductsService, IngredientList } from '@/entities/products'
  import { IBurgerDTO } from '@/entities/burger/model/types'

  const productsStore = useProductsStore()
  const productsService = useProductsService()
  const burgerStore = useBurgerStore()
  const burgerService = useBurgerService()

  const props = defineProps<{
    mode: 'create' | 'edit'
    burger?: IBurgerDTO
    index?: number
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

  const disabled = computed(() => {
    const hasCorrectLength: boolean = burgerStore.allIngredients.length >= 6 && burgerStore.allIngredients.length <= 15
    const hasChanges = !isEqual(burgerStore.oldBurger, burgerStore.burger)
    return !hasCorrectLength || (!hasChanges && props.mode === 'edit')
  })
  const save = async () => {
    switch (props.mode) {
      case 'create':
        await burgerService.createBurger()
        break
      case 'edit':
        await burgerService.editBurger(props.index)
        break
    }
    close()
  }

  onMounted(async () => {
    if (!productsStore.hasData) {
      await productsService.setProducts()
    }
  })

  onUnmounted(() => burgerStore.clearState())
</script>

<template>
  <el-button
    v-if="props.mode === 'create'"
    @click="open"
    :icon="Burger"
  >
    {{ $t(`burger.form.${props.mode}.button`) }}
  </el-button>

  <el-icon
    v-if="props.mode === 'edit'"
    class="edit-icon"
    @click="open"
  >
    <Edit />
  </el-icon>

  <teleport to="body">
    <el-dialog
      v-model="dialog"
      :title="$t(`burger.form.${props.mode}.title`)"
      width="600px"
      top="8vh"
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
  </teleport>
</template>

<style lang="scss" scoped>
  .edit-icon {
    &:hover {
      cursor: pointer;
      color: colors.$bg-color-page;
    }
  }
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
    @include mixins.mt(10px);
    @include mixins.pt(10px);
    border-top: 1px solid colors.$bg-color-overlay;
  }
</style>

<script setup lang="ts">
  import { ref } from 'vue'
  import { ProductCard } from '@/entities/products'
  import { IProductDTO } from '../model/types'

  const props = defineProps({
    type: {
      type: String,
      default: '',
      required: true
    },
    products: {
      type: Array<IProductDTO>,
      default: () => [],
      required: true
    }
  })

  const isActive = ref<boolean>(false)

  const onClickHeader = () => (isActive.value = !isActive.value)
</script>

<template>
  <div class="product-type-card">
    <!-- Панель управления блоком -->
    <div
      @click="onClickHeader"
      :class="{ 'product-type-card__header': true, active: isActive }"
    >
      {{ $t(`products.types.${props.type}`) }}
      <!-- Иконка шеврона -->
      <div :class="{ 'header__arrow-icon': true, 'active-icon': isActive }">
        <el-icon><ArrowDownBold /></el-icon>
      </div>
    </div>

    <!-- Секция карточек продуктов -->
    <div :class="{ 'product-type-card__body': true, 'active-body': isActive }">
      <template
        v-for="product in props.products"
        :key="product.id"
      >
        <ProductCard :product="product" />
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .product-type-card {
    min-height: 300px;
    width: auto;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid colors.$bg-color-overlay;
    @include mixins.mb(20px);
  }
  .product-type-card__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    @include mixins.pa(10px);
    @include mixins.no__copy();
    color: white !important;
    font-size: 0.9em;
    border-bottom: 1px solid colors.$bg-color-overlay;
    transition: 0.3s;
    &:hover {
      cursor: pointer;
    }
  }
  .header__arrow-icon {
    width: 2em;
    height: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.3s;
  }
  // TODO: вынести в общие стили с переменными высоту и паддинги тела
  .product-type-card__body {
    height: 200px;
    display: grid;
    gap: 20px;
    justify-content: start !important;
    justify-items: center;
    grid-template-columns: repeat(auto-fill, minmax(200px, 2fr));
    @include mixins.pa(20px);
    transition: max-height 3s ease;
    overflow: hidden;
  }
  .active {
    .active-icon {
      transform: rotate(180deg);
      transition: 0.3s;
    }
  }
  .active-body {
    overflow: auto;
    height: auto !important;
  }
</style>

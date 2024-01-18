<script setup lang="ts">
  import { onMounted } from 'vue'
  import { IProductDTO } from '../model/types'
  import { useProductsStore, useProductsService } from '@/entities/products'

  const productsStore = useProductsStore()
  const productsService = useProductsService()

  const baseURL: string = import.meta.env.VITE_API_URL

  // Устанавливаем дату и активный класс для перетаскиваемого продукта
  const onDragStart = (event: DragEvent, data: IProductDTO) => {
    event.dataTransfer?.setData('orders-product', JSON.stringify(data))
    const element = event.target as HTMLElement
    element.classList.add('orders-product-selected')
  }
  // Сбрсываем при десантировании элемента
  const onDragEnd = (event: DragEvent, data: IProductDTO) => {
    event.dataTransfer?.setData('orders-product', JSON.stringify(data))
    const element = event.target as HTMLElement
    element.classList.remove('orders-product-selected')
  }

  onMounted(() => {
    if (!productsStore.hasData) {
      productsService.setProducts()
    }
  })
</script>

<template>
  <div class="orders-products-list">
    <div class="orders-products-list__title">
      <span>{{ $t('products.ordersProducts.title') }}</span>
    </div>
    <!-- Список типов -->
    <div class="orders-products-list__body">
      <div
        v-for="(data, type) in productsStore.orderProducts"
        :key="type"
      >
        <div class="body__type-title">
          <b>{{ $t(`products.types.${type}`) }}</b>
        </div>
        <!-- Товары к заказу (Закуски, напитки, соусы) -->
        <div
          v-for="product in data"
          :key="product.id"
          class="orders-product"
          draggable="true"
          @dragstart="onDragStart($event, product)"
          @dragend="onDragEnd($event, product)"
        >
          <img
            :src="`${baseURL}images/${product.photoPath}`"
            alt="order product photo"
            draggable="false"
          />
          <div
            class="orders-product__info"
            draggable="false"
          >
            {{ product.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .orders-products-list {
    width: 210px;
    @include mixins.no__copy();
  }
  .orders-products-list__title {
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: colors.$bg-color;
    border-radius: 10px 10px 0 0;
    border-top: 1px solid colors.$bg-color-overlay;
    border-left: 1px solid colors.$bg-color-overlay;
    border-right: 1px solid colors.$bg-color-overlay;
    font-size: 1.1em;
    color: colors.$primary;
  }
  .orders-products-list__body {
    height: 585px;
    overflow-y: scroll;
    max-width: 350px;
    @include mixins.px(10px);
    @include mixins.pt(10px);
    border-radius: 0 0 10px 10px;
    border: 1px solid colors.$bg-color-overlay;
  }
  .body__type-title {
    @include mixins.py(10px);
    @include mixins.mb(10px);
    border-bottom: 1px solid colors.$bg-color-overlay;
  }
  .orders-product {
    height: auto;
    width: 180px;
    border: 2px solid colors.$bg-color-overlay;
    border-radius: 10px;
    overflow: hidden;
    @include mixins.mb(10px);
    img {
      height: 140px;
      width: 180px;
      object-fit: cover;
      border-radius: 10px;
      overflow: hidden;
      border-radius: 10px 10px 0 0;
    }
    &:hover {
      cursor: pointer;
      border: 2px dashed colors.$bg-color-overlay;
    }
  }
  .orders-product__info {
    display: flex;
    height: 30px;
    align-items: center;
    white-space: nowrap;
    font-size: 0.8em;
    @include mixins.px(10px);
  }
  .orders-product-selected {
    border: 2px dashed colors.$bg-color-page !important;
  }
</style>

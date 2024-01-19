<script setup lang="ts">
  import { useOrdersStore } from '@/entities/orders'
  import { DropZoneWidget } from '@/widgets/orders'

  const ordersStore = useOrdersStore()

  const baseURL: string = import.meta.env.VITE_API_URL

  // Обертка продуктов заказа
  // Добавление активного класса для обертки ингредиентов при перетаскивании
  const onDragOverList = () => {
    const element = document.getElementById('orders-products-constructor')
    if (element) element.classList.add('active-drop-zone')
  }
  // Удаление активного класса для обертки ингредиентов при перетаскивании
  const onDragLeaveList = () => {
    const element = document.getElementById('orders-products-constructor')
    if (element) element.classList.remove('active-drop-zone')
  }
  // При сбрасывании либо добавляем новый ингредиент, либо меняем порядоак внутри
  const onDrop = (event: DragEvent) => {
    // если это добавление нового ингредиента
    if (event.dataTransfer?.getData('orders-product')) {
      const ingredient = JSON.parse(event.dataTransfer?.getData('orders-product'))
      ordersStore.addOrdersProduct(ingredient)
    }
    onDragLeaveList()
  }
</script>

<template>
  <div id="orders-products-constructor">
    <!-- Заголовок -->
    <div class="constructor__title">
      {{ $t('orders.form.constructor.title') }}
    </div>

    <div class="constructor__body">
      <!-- Инфо блок при перетаскивании -->
      <DropZoneWidget
        v-if="!ordersStore.activeOrder?.ordersProducts.length"
        @dragenter.prevent="onDragOverList"
        @dragover.prevent="onDragLeaveList"
        @drop="onDrop"
        width="auto"
      />

      <!-- Товары к заказу -->
      <div
        v-else
        class="orders-products-list"
        @dragenter.prevent
        @dragover.prevent="onDragOverList"
        @dragleave.prevent="onDragLeaveList"
        @drop.prevent="onDrop"
      >
        <div
          v-for="(product, i) in ordersStore.activeOrder?.ordersProducts"
          :key="i"
          @click="ordersStore.removeOrdersProduct(i)"
          class="orders-product"
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
  #orders-products-constructor {
    width: 100%;
    @include mixins.mr(20px);
  }
  .constructor__title {
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
    @include mixins.no__copy();
  }
  .constructor__body {
    height: 250px;
    overflow-y: scroll;
    width: auto;
    min-width: 300px;
    @include mixins.pa(10px);
    border-radius: 0 0 10px 10px;
    border: 1px solid colors.$bg-color-overlay;
  }

  .orders-products-list {
    height: auto;
    width: auto;
    display: grid;
    gap: 10px;
    @include mixins.pa(10px);
    justify-content: start;
    justify-items: center;
    grid-template-columns: repeat(auto-fill, minmax(180px, 3fr));
    overflow-y: scroll;
  }
  .orders-product {
    height: auto;
    width: 180px;
    border: 2px solid colors.$bg-color-overlay;
    border-radius: 10px;
    overflow: hidden;
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
      border: 2px dashed colors.$danger;
      img {
        opacity: 30%;
      }
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

  .active-drop-zone {
    .orders-products-list {
      width: calc(auto - 4px);
      border-radius: 10px;
      border: 2px dashed colors.$bg-color-page;
    }
  }
</style>

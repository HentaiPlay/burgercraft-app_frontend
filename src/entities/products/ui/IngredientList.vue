<script setup lang="ts">
  import { onMounted } from 'vue'
  import { useProductsStore, useProductsService } from '@/entities/products'
  import { IProductDTO } from '../model/types'

  const productsStore = useProductsStore()
  const baseURL: string = import.meta.env.VITE_API_URL

  // Устанавливаем дату и активный класс для перетаскиваемого продукта
  const onDragStart = (event: DragEvent, data: IProductDTO) => {
    event.dataTransfer?.setData('ingredient', JSON.stringify(data))
    const element = event.target as HTMLElement
    element.classList.add('ingredient-selected')
  }
  // Сбрсываем при десантировании элемента
  const onDragEnd = (event: DragEvent, data: IProductDTO) => {
    event.dataTransfer?.setData('ingredient', JSON.stringify(data))
    const element = event.target as HTMLElement
    element.classList.remove('ingredient-selected')
  }

  onMounted(async () => {
    if (!productsStore.hasData) {
      const productsService = useProductsService()
      await productsService.setProducts()
    }
  })
</script>

<template>
  <div class="ingredients-list">
    <!-- Заголовок -->
    <div class="ingredients-list__title">
      <span>{{ $t('products.ingredientList.title') }}</span>
    </div>

    <div class="ingredients-list__body">
      <!-- Ингредиент -->
      <div
        v-for="ingredient in productsStore.burgerIngredients"
        :key="ingredient.id"
        class="ingredient"
        draggable="true"
        @dragstart="onDragStart($event, ingredient)"
        @dragend="onDragEnd($event, ingredient)"
      >
        <!-- Название и ценник -->
        <img
          :src="`${baseURL}images/${ingredient.photoPath}`"
          alt="ingredient photo"
          draggable="false"
        />
        <div
          class="ingredient__info"
          draggable="false"
        >
          {{ ingredient.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .ingredients-list__title {
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: colors.$bg-color;
    border-radius: 10px 10px 0 0;
    border-top: 1px solid colors.$bg-color-overlay;
    border-left: 1px solid colors.$bg-color-overlay;
    border-right: 1px solid colors.$bg-color-overlay;
    @include mixins.no__copy();
  }
  .ingredients-list__body {
    height: 585px;
    overflow-y: scroll;
    max-width: 350px;
    @include mixins.px(10px);
    @include mixins.pt(10px);
    border-radius: 0 0 10px 10px;
    border: 1px solid colors.$bg-color-overlay;
    // стили для ползунка скрола
    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-track {
      @include mixins.mb(10px);
      background: colors.$bg-color;
    }
    &::-webkit-scrollbar-thumb {
      background-color: colors.$primary;
      border-radius: 20px;
      border: 6px solid colors.$primary;
    }
  }
  .ingredient {
    height: auto;
    width: 210px;
    border: 2px solid colors.$bg-color-overlay;
    border-radius: 10px;
    overflow: hidden;
    @include mixins.mb(10px);
    img {
      height: 70px;
      width: 210px;
      border-radius: 10px;
      overflow: hidden;
      border-radius: 10px 10px 0 0;
    }
    &:hover {
      cursor: pointer;
      border: 2px dashed colors.$bg-color-overlay;
    }
  }
  .ingredient__info {
    display: flex;
    height: 30px;
    align-items: center;
    white-space: nowrap;
    font-size: 0.8em;
    @include mixins.px(10px);
  }
  .ingredient-selected {
    border: 2px dashed colors.$bg-color-page !important;
  }
</style>

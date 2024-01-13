<script setup lang="ts">
  import { onUnmounted } from 'vue'
  import { useProductsStore } from '@/entities/products'
  import { useBurgerStore } from '@/entities/burger'

  const burgerStore = useBurgerStore()
  const productsStore = useProductsStore()

  const baseURL: string = import.meta.env.VITE_API_URL

  // Обертка ингредиентов
  // Добавление активного класса для обертки ингредиентов при перетаскивании
  const onDragOverList = () => {
    const element = document.getElementsByClassName('constructor')[0]
    element.classList.add('active-drop-zone')
  }
  // Удаление активного класса для обертки ингредиентов при перетаскивании
  const onDragLeaveList = () => {
    const element = document.getElementsByClassName('constructor')[0]
    element.classList.remove('active-drop-zone')
  }

  // Ингредиенты
  // При перемещении устанавливаем активный класс для ингредиента
  const onDragStartIngredient = (event: DragEvent) => {
    const el = event.target as HTMLElement
    el.classList.add('burger-ingredient-selected')
  }
  // При десантировании удаляем активный класс для ингредиента
  const onDragEndIngredient = (event: DragEvent) => {
    const el = event.target as HTMLElement
    el.classList.remove('burger-ingredient-selected')
  }
  // Перемещение или изменение порядка ингридиентов внутри бургера
  const onDragEnterIngredient = (event: DragEvent) => {
    const activeElement = document.getElementsByClassName('burger-ingredient-selected')[0]
    // Проверка на внутреннее перемещение
    if (!activeElement) return
    const hoverElement = event.currentTarget as HTMLElement
    const isMoveable = activeElement !== hoverElement && hoverElement.classList.contains('burger-ingredient')
    // Если нет, прерываем выполнение функции
    if (!isMoveable) return
    // Находим элемент, перед которым будем вставлять
    const nextElement =
      hoverElement === activeElement.nextElementSibling ? hoverElement.nextElementSibling : hoverElement
    // Вставляем activeElement перед nextElement
    const parent = document.getElementsByClassName('burger-ingredient-list')[0]
    parent.insertBefore(activeElement, nextElement)
  }
  const removeIngredient = (index: number) => {
    burgerStore.removeIngredient(index)
  }

  // При сбрасывании либо добавляем новый ингредиент, либо меняем порядоак внутри
  const onDrop = (event: DragEvent) => {
    // если это добавление нового ингредиента
    if (event.dataTransfer?.getData('ingredient')) {
      const ingredient = JSON.parse(event.dataTransfer?.getData('ingredient'))
      burgerStore.addIngredient(ingredient)
    }
    onDragLeaveList()
  }

  onUnmounted(() => burgerStore.clearState())
</script>

<template>
  <div class="burger-constructor">
    <!-- Заголовок -->
    <div class="burger-constructor__title">
      <span>{{ $t('burger.form.constructor.title') }}</span>
    </div>

    <!-- Конструктор -->
    <div class="burger-constructor__body">
      <div class="constructor">
        <!-- Верхняя булочка -->
        <div class="brioche">
          <img
            :src="`${baseURL}images/${productsStore.brioches[0].photoPath}`"
            alt="ingredient photo"
          />
        </div>

        <!-- Инфо блок при перетаскивании -->
        <div
          v-if="!burgerStore.ingredients.length"
          class="body__info"
          @dragenter.prevent="onDragOverList"
          @dragover.prevent="onDragLeaveList"
          @drop="onDrop"
        >
          <div class="info__icon">
            <el-icon :size="30"><Plus /></el-icon>
          </div>
        </div>

        <!-- Ингредиенты -->
        <div
          v-else
          class="burger-ingredient-list"
          @dragenter.prevent
          @dragover.prevent="onDragOverList"
          @dragleave.prevent="onDragLeaveList"
          @drop.prevent="onDrop"
        >
          <div
            v-for="(ingredient, i) in burgerStore.ingredients"
            :key="i"
            class="burger-ingredient"
            @click="removeIngredient(i)"
            @dragover.prevent="onDragEnterIngredient"
            @dragstart="onDragStartIngredient"
            @dragend="onDragEndIngredient"
            draggable="true"
          >
            <img
              :src="`${baseURL}images/${ingredient.photoPath}`"
              alt="ingredient photo"
              draggable="false"
            />
          </div>
        </div>

        <!-- Нижняя булочка -->
        <div class="brioche">
          <img
            :src="`${baseURL}images/${productsStore.brioches[1].photoPath}`"
            alt="ingredient photo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .burger-constructor {
    @include mixins.no__copy();
  }
  .burger-constructor__title {
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: colors.$bg-color;
    border-radius: 10px 10px 0 0;
    border-top: 1px solid colors.$bg-color-overlay;
    border-left: 1px solid colors.$bg-color-overlay;
    border-right: 1px solid colors.$bg-color-overlay;
  }
  .burger-constructor__body {
    height: 585px;
    overflow-y: scroll;
    max-width: 350px;
    @include mixins.pt(10px);
    @include mixins.px(10px);
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
  .constructor {
    background-color: white;
    border-radius: 10px;
    overflow: hidden;
    @include mixins.pa(10px);
    @include mixins.mb(10px);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .brioche {
    height: 70px;
    width: 210px;
    border-radius: 10px;
    @include mixins.mb(10px);
    @include mixins.no__copy();
    img {
      height: 70px;
      width: 210px;
    }
  }

  // Информационный блок для перетаскивания
  .body__info {
    height: 100%;
    width: calc(210px - (5px * 2));
    @include mixins.ma(10px);
    border: 2px dashed colors.$bg-color-page;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: colors.$bg-color-page;
    @keyframes pulse {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.1);
      }
      100% {
        transform: scale(1);
      }
    }
    .info__icon {
      height: 50px;
      width: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      border: 2px dashed colors.$bg-color-page;
      animation: pulse 1.5s infinite;
      @include mixins.my(30px);
    }
  }

  // Список ингредиентов
  .burger-ingredient-list {
    @include mixins.pt(5px);
    @include mixins.px(5px);
    width: calc(210px + 4px);
  }

  // Ингредиент
  .burger-ingredient {
    height: 70px;
    width: 210px;
    border-radius: 10px;
    overflow: hidden;
    @include mixins.mb(5px);
    img {
      height: 70px;
      width: 210px;
    }
    &:hover {
      cursor: pointer;
      width: calc(210px - 4px);
      height: calc(70px - 4px);
      border: 2px dashed colors.$danger;
      img {
        opacity: 30%;
      }
    }
  }
  .burger-ingredient-selected {
    border: 2px dashed colors.$bg-color-page !important;
  }
  // Активная зона в которую перетаскивают ингредиенты
  .active-drop-zone {
    .burger-ingredient-list {
      width: 210px;
      border-radius: 10px;
      border: 2px dashed colors.$bg-color-page;
    }
  }
</style>

<script setup lang="ts">
  import { onMounted, onUnmounted } from 'vue'
  import { DropZoneWidget } from '@/widgets/orders'
  import { useProductsStore } from '@/entities/products'
  import { useBurgerStore } from '@/entities/burger'

  const burgerStore = useBurgerStore()
  const productsStore = useProductsStore()

  const baseURL: string = import.meta.env.VITE_API_URL

  // Обертка ингредиентов
  // Добавление активного класса для обертки ингредиентов при перетаскивании
  const onDragOverList = () => {
    const element = document.getElementById('ingredients-constructor')
    if (element) element.classList.add('active-drop-zone')
  }
  // Удаление активного класса для обертки ингредиентов при перетаскивании
  const onDragLeaveList = () => {
    const element = document.getElementById('ingredients-constructor')
    if (element) element.classList.remove('active-drop-zone')
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

  onMounted(() => burgerStore.setBrioches())
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
      <div id="ingredients-constructor">
        <!-- Верхняя булочка -->
        <div class="brioche">
          <img
            :src="`${baseURL}images/${productsStore.brioches[0].photoPath}`"
            alt="ingredient photo"
          />
        </div>

        <!-- Инфо блок при перетаскивании -->
        <DropZoneWidget
          v-if="!burgerStore.ingredients.length"
          @dragenter.prevent="onDragOverList"
          @dragover.prevent="onDragLeaveList"
          @drop="onDrop"
        />

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
  }
  #ingredients-constructor {
    width: 220px;
    background-color: white;
    border-radius: 10px;
    overflow: hidden;
    @include mixins.pa(15px);
    @include mixins.mb(10px);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .brioche {
    height: 70px;
    width: 210px;
    border-radius: 10px;
    @include mixins.mb(5px);
    @include mixins.no__copy();
    img {
      height: 70px;
      width: 210px;
    }
  }

  // Список ингредиентов
  .burger-ingredient-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    @include mixins.py(5px);
    width: 214px;
  }

  // Ингредиент
  .burger-ingredient {
    height: 70px;
    width: 210px;
    border-radius: 10px;
    overflow: hidden;
    @include mixins.mb(5px);
    border: 2px dashed white;
    img {
      height: 70px;
      width: 210px;
    }
    &:hover {
      cursor: pointer;
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
      width: 218px;
      border-radius: 10px;
      border: 2px dashed colors.$bg-color-page;
    }
  }
</style>

<script setup lang="ts">
  import { ProductForm } from '@/entities/products'
  import { useUserStore } from '@/entities/user'
  import { IProductDTO } from '../model/types'

  const productStore = useUserStore()

  const props = defineProps<{ product: IProductDTO }>()
  const baseURL: string = import.meta.env.VITE_API_URL
</script>

<template>
  <div class="product-card active">
    <!-- Картинка -->
    <div class="product-card__image">
      <img
        :src="`${baseURL}images/${product.photoPath}`"
        :alt="$t('products.productCard.alt')"
        :key="`${product.photoPath}?timestamp=${Date.now()}`"
      />
      <div
        v-if="productStore.isAdmin"
        class="actions"
      >
        <div class="actions__list">
          <ProductForm
            mode="edit"
            :product="props.product"
          />
        </div>
      </div>
    </div>

    <!-- Информация -->
    <div class="product-card__info">
      <div class="info-block">
        <!-- Название -->
        <span class="info-block__item">{{ props.product.name }}</span>
        <!-- Стоимость -->
        <div class="info-block__item">
          <span class="info-block__price">{{ $t('products.productCard.price') }}:</span>
          <span>{{ props.product.price }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .product-card {
    width: 246px;
    height: 246px;
    border-radius: 10px;
    border: 2px solid colors.$bg-color-overlay;
    background-color: colors.$bg-color;
    font-size: 0.9em;
    overflow: hidden;
  }
  .product-card__image {
    height: 160px;
    overflow: hidden;
    position: relative;
    border-bottom: 2px solid colors.$bg-color-overlay;
    background-color: white;
    img {
      height: 100%;
      width: 100%;
      object-fit: contain;
      object-position: center;
      transition: transform 0.3s ease;
      transition: transform 0.3s ease-in-out;
      &:hover {
        cursor: pointer;
        transform: scale(1.1);
      }
    }
  }
  .actions {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    color: colors.$info;
    background-color: rgba(0, 0, 0, 0.75);
    display: none;
    justify-content: center;
    align-items: center;
  }
  .actions__list {
    font-size: 2.6em;
    transition: 0.3s;
    &:hover {
      cursor: pointer;
      color: colors.$bg-color-page;
      transition: 0.3s;
    }
  }
  .product-card__info {
    display: flex;
    justify-content: start;
    align-items: center;
    height: calc(246px - (160px + 2px));
    width: 100%;
  }
  .info-block {
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    @include mixins.px(20px);
    .info-block__item {
      height: 20px;
      overflow: hidden;
      white-space: nowrap;
      @include mixins.py(0.4em);
    }
    .info-block__price {
      color: colors.$bg-color-overlay;
      @include mixins.mr(5px);
    }
  }
  .active {
    .product-card__image {
      &:hover .actions {
        display: flex;
      }
      &:hover img {
        transform: scale(1.1);
      }
    }
  }
</style>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { useProductsService, useProductsStore } from '@/entities/products'
  import { ProductTypeCard, ProductTypeFilter } from '@/entities/products'

  const route = useRoute()

  const productsService = useProductsService()
  const productsStore = useProductsStore()

  const showProductType = ref<(type: string) => boolean>((type) => {
    const hasParam = !!route.params.type && route.params.type !== ''
    return hasParam ? route.params.type === type : true
  })

  onMounted(async () => {
    if (!productsStore.hasData) {
      await productsService.setProducts()
    }
  })
</script>

<template>
  <div class="products-wrapper">
    <!-- Фильтр -->
    <ProductTypeFilter />

    <!-- Карточки типов продуктов -->
    <template v-for="(products, type, i) in productsStore.products">
      <ProductTypeCard
        v-if="showProductType(type)"
        :products="products"
        :type="type"
        :key="i"
      />
    </template>
  </div>
</template>

<style lang="scss" scoped></style>

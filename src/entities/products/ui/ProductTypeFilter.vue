<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { ProductForm } from '@/entities/products'
  import { global } from '@/shared/composables'
  import { useUserStore } from '@/entities/user'

  const userStore = useUserStore()

  // Типы продуктов
  const select = ref(global.router?.currentRoute.value.params.type ?? 'all')
  const options = computed<Record<string, string>[]>(() => [
    {
      value: 'all',
      label: `${global.i18n?.t('products.types.all') ?? ''}`
    },
    {
      value: 'burger_ingredient',
      label: `${global.i18n?.t('products.types.burger_ingredient') ?? ''}`
    },
    {
      value: 'snack',
      label: `${global.i18n?.t('products.types.snack') ?? ''}`
    },
    {
      value: 'sauce',
      label: `${global.i18n?.t('products.types.sauce') ?? ''}`
    },
    {
      value: 'drink',
      label: `${global.i18n?.t('products.types.drink') ?? ''}`
    }
  ])

  const onChangeType = (type: string): void => {
    type === 'all'
      ? global.router?.push({ name: 'products' })
      : global.router?.push({ name: 'products', params: { type: type } })
  }
</script>

<template>
  <div class="product-types-filter">
    <!-- Выбор какой тип отображать -->
    <el-select
      :clearable="true"
      collapse-tags
      v-model="select"
      :placeholder="$t('products.select.placeholder')"
      @change="onChangeType"
      class="filter"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>

    <!-- Создать продукт -->
    <ProductForm
      v-if="userStore.isAdmin"
      mode="create"
    />
  </div>
</template>

<style lang="scss" scoped>
  .product-types-filter {
    @include mixins.pb(20px);
    @include mixins.mb(20px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid colors.$bg-color-overlay;
    .filter {
      max-width: 400px;
      @include mixins.mr(20px);
    }
  }
</style>

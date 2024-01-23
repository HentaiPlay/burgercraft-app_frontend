<script lang="ts" setup>
  import { computed, ComputedRef } from 'vue'

  const publicPath = import.meta.env.VITE_APP_URL
  const props = defineProps(['size', 'showTitle'])

  enum sizeLogo {
    min = 50,
    normal = 100
  }

  const size: ComputedRef<sizeLogo> = computed((): sizeLogo => {
    switch (props.size) {
      case 'min':
        return sizeLogo.min
      case 'normal':
        return sizeLogo.normal
      default:
        return sizeLogo.normal
    }
  })

  const showTitle: ComputedRef<boolean> = computed((): boolean => {
    switch (props.showTitle) {
      case '':
        return true
      default:
        return false
    }
  })
</script>

<template>
  <div class="logo">
    <img
      :src="`${publicPath}/logo.svg`"
      alt="Логотип"
      :width="size"
      :height="size"
    />
    <span v-if="showTitle">BurgerCraft</span>
  </div>
</template>

<style lang="scss" scoped>
  .logo {
    display: flex;
    align-items: center;
    > span {
      color: white;
      font-size: 1.2em;
      font-weight: bold;
      @include mixins.ml(10px);
    }
    &:hover {
      cursor: pointer;
    }
  }
</style>

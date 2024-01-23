<script lang="ts" setup>
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { global } from '@/shared/composables'

  const route = useRoute()

  const change = () => {
    if (global.i18n !== null) {
      switch (global.i18n.locale.value) {
        case 'ru':
          global.i18n.locale.value = 'en'
          break
        case 'en':
          global.i18n.locale.value = 'ru'
          break
      }
      document.title = global.i18n.t(route.meta.title)
    }
  }

  const name = computed(() => {
    let locale = 'ru'
    if (global.i18n !== null) {
      switch (global.i18n.locale.value) {
        case 'ru':
          locale = 'en'
          break
        case 'en':
          locale = 'ru'
          break
      }
    }
    return locale.toUpperCase()
  })
</script>

<template>
  <div
    @click="change"
    class="locale"
  >
    {{ name }}
  </div>
</template>

<style lang="scss" scoped>
  .locale {
    width: 1.4em;
    height: 1.4em;
    display: flex;
    align-items: center;
    justify-content: center;
    color: colors.$info;
    @include mixins.no__copy();
    &:hover {
      cursor: pointer;
      color: colors.$primary;
    }
  }
</style>

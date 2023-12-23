<script setup lang="ts">
  import { watch, computed, ref, markRaw } from 'vue'
  import { useRoute } from 'vue-router'
  import { AppLayout, DefaultLayout } from '@/widgets/layouts'

  const layout = ref()
  const route = useRoute()

  watch(
    computed(() => route.path),
    async () => {
      switch (route.meta?.layout) {
        case 'app':
          layout.value = markRaw(AppLayout)
          break
        default:
          layout.value = markRaw(DefaultLayout)
      }
    }
  )
</script>

<template>
  <MyNotification :maxCount="5" />
  <component :is="layout">
    <RouterView />
  </component>
</template>

<style scoped lang="scss"></style>

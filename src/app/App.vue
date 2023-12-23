<script setup lang="ts">
  import { watch, ref, computed, markRaw, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { AppLayout, DefaultLayout } from '@/widgets/layouts'

  const layout = ref()
  const route = useRoute()
  const router = useRouter()

  // Установка шаблона
  const setLayout = async () => {
    switch (route.meta?.layout) {
      case 'app':
        layout.value = markRaw(AppLayout)
        break
      default:
        layout.value = markRaw(DefaultLayout)
    }
  }

  watch(
    computed(() => route.path),
    setLayout
  )

  onMounted(async () => {
    await router.isReady()
    setLayout()
  })
</script>

<template>
  <MyNotification :maxCount="5" />
  <component :is="layout">
    <RouterView />
  </component>
</template>

<style scoped lang="scss"></style>

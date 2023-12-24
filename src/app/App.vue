<script setup lang="ts">
  import { watch, ref, computed, markRaw, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { AppLayout, DefaultLayout } from '@/widgets/layouts'
  import { Preloader } from '@/widgets/preloader'
  import { useUIStateStore } from '@/shared/ui-state.store'

  const layout = ref()
  const route = useRoute()
  const router = useRouter()
  const uiStore = useUIStateStore()

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
  <!-- Уведомления -->
  <MyNotification :maxCount="5" />
  <!-- Шаблон страницы -->
  <component :is="layout">
    <!-- Прелоадер -->
    <Preloader v-if="uiStore.isActivePreloader" />
    <!-- Содержимое роутера -->
    <RouterView
      v-else
      v-slot="{ Component }"
    >
      <component :is="Component" />
    </RouterView>
  </component>
</template>

<style scoped lang="scss"></style>

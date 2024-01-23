<script setup lang="ts">
  import { watch, ref, computed, markRaw, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { AppLayout, DefaultLayout } from '@/widgets/layouts'
  import { Preloader } from '@/widgets/preloader'
  import { useUIStateStore } from '@/shared/store/ui-state'
  import { useI18n } from 'vue-i18n'
  import { MessageSchema, LanguageList } from '@/app/providers'

  const layout = ref()
  const route = useRoute()
  const router = useRouter()
  const uiStore = useUIStateStore()
  const i18n = useI18n<{ message: MessageSchema }, LanguageList>({ useScope: 'global' })

  // Установка глобального композабла
  import { global } from '@/shared/composables'
  global.router = router
  global.i18n = i18n

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

  <!-- Окно подтверждений -->
  <MyConfirmDialog />

  <!-- Шаблон страницы -->
  <component
    v-if="global.isReady()"
    :is="layout"
  >
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

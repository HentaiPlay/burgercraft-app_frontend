import { defineStore } from 'pinia'
import { ref } from 'vue'
import { global } from '@/shared/composables'

export const useUIStateStore = defineStore('uiState', () => {
  // Прелоадер
  const isActivePreloader = ref<boolean>(false)
  function showPreloader() {
    isActivePreloader.value = true
    setTimeout(() => {
      isActivePreloader.value = false
    }, 500)
  }

  function changeTitle(title: string) {
    document.title = global.i18n ? global.i18n.t(title) : 'BurgerCraft'
  }

  return { isActivePreloader, showPreloader, changeTitle }
})

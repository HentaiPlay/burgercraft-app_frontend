import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUIStateStore = defineStore('uiState', () => {
  // Прелоадер
  const isActivePreloader = ref<boolean>(false)
  function showPreloader() {
    isActivePreloader.value = true
    setTimeout(() => {
      isActivePreloader.value = false
    }, 500)
  }

  return { isActivePreloader, showPreloader }
})

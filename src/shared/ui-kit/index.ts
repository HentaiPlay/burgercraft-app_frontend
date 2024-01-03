import type { App } from 'vue'
// Иконки из Element Plus
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// Кастомные компоненты
import MyLogo from './components/MyLogo.vue'
import MyNotification from './components/MyNotification.vue'
import MyImageUploader from './components/MyImageUploader.vue'

export default {
  install: (app: App) => {
    // Регистрация иконок из Element Plus
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
    // TODO: добавить динамическую загрузку и регистрацию для компонентов
    // Регистрация кастомных компонентов
    app.component('MyLogo', MyLogo)
    app.component('MyNotification', MyNotification)
    app.component('MyImageUploader', MyImageUploader)
  }
}

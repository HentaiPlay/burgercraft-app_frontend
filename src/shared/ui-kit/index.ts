import type { App } from 'vue'
// Иконки из Element Plus
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// Кастомные компоненты
import MyLogo from './components/MyLogo.vue'
import MyNotification from './components/MyNotification.vue'

export default {
  install: (app: App) => {
    // Регистрация иконок из Element Plus
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
    // Регистрация кастомных компонентов
    app.component('MyLogo', MyLogo)
    app.component('MyNotification', MyNotification)
  }
}

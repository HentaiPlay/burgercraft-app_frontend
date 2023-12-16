import type { App } from 'vue'
import MyLogo from './components/MyLogo.vue'
export default {
  install: (app: App) => {
    app.component('MyLogo', MyLogo)
  }
}

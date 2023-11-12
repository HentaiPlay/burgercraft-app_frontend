import type { App } from 'vue'
import MyTestComponent from './components/my-test-component.vue'
export default {
  install: (app: App) => {
    app.component('my-test-component', MyTestComponent)
  }
}

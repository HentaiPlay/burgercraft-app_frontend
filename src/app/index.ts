import { createApp } from 'vue'
import App from './App.vue'
import { router } from './providers'

export const app = createApp(App).use(router)

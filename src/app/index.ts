import { createApp } from 'vue'
import App from './App.vue'
import { router } from './providers'
import { store } from './providers'

export const app = createApp(App).use(router).use(store)

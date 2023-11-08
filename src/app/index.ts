import { createApp } from 'vue'
import App from './App.vue'
import { router } from './providers'
import { store } from './providers'
import ElementPlus from 'element-plus'

export const app = createApp(App).use(router).use(store).use(ElementPlus)

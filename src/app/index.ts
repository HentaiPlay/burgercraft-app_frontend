import { createApp } from 'vue'
import App from './App.vue'
import { router } from './providers'
import { store } from './providers'
import '@assets/styles/index.scss'
import uiKit from '@/shared/ui-kit'

export const app = createApp(App).use(router).use(store).use(uiKit)

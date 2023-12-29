import { createI18n } from 'vue-i18n'

import ru from '@/shared/i18n/ru.json'
import en from '@/shared/i18n/en.json'

export type LanguageList = 'ru' | 'en'
export type MessageSchema = typeof ru

export const i18n = createI18n<[MessageSchema], LanguageList>({
  locale: 'ru',
  fallbackLocale: 'en',
  legacy: false,
  globalInjection: true,
  messages: {
    ru: ru,
    en: en
  }
})

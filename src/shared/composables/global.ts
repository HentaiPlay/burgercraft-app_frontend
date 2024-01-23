import { Router } from 'vue-router'
import { Composer } from 'vue-i18n'
import { MessageSchema, LanguageList } from '@/app/providers/i18n'

interface GlobalComposable {
  router: Router | null
  i18n: Composer<Record<LanguageList, MessageSchema>> | null
  isReady: () => boolean
}

const isReady = () => global.router !== null && global.i18n !== null

// Глобальный композабл для регистрации желаемых инстансов, что бы избежать
// использования provide/inject или форсировать невозможность их использования
const global: GlobalComposable = {
  router: null,
  i18n: null,
  isReady: isReady
}

export default global

import { computed } from 'vue'
import type { FormRules } from 'element-plus'
import { global } from '@/shared/composables'

export default function useAuthComposable() {
  // Установка текстовок через глобалный композабл i18n
  const setMessage = (key: string, args?: Record<string, string | number>): string => {
    return global.i18n ? global.i18n.t(key, args || {}) : ''
  }

  // Все правила валидации для auth форм, если нужно опционально, то rules устанавоить для кажого item отдельно
  const allRules = computed<FormRules>(() => ({
    name: [
      { required: true, message: setMessage('rules.required'), trigger: 'blur' },
      { min: 3, message: setMessage('rules.min', { min: 3 }), trigger: 'blur' }
    ],
    password: [
      { required: true, message: setMessage('rules.required'), trigger: 'blur' },
      { min: 8, max: 20, message: setMessage('rules.min_max', { min: 8, max: 20 }), trigger: 'blur' }
    ],
    roleId: [{ required: true, message: setMessage('rules.required'), trigger: 'blur' }]
  }))

  return {
    getRules: () => allRules
  }
}

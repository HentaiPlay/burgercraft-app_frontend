import { useUserApi } from '..'
import { ILoginDTO } from '@/entities/auth/model/types'
import useMyNotification from '@/shared/ui-kit/composables/my-notification'
import { global } from '@/shared/composables'
import { useUserStore } from '..'

export default function useUserService() {
  const userApi = useUserApi()
  const userStore = useUserStore()
  const myNotify = useMyNotification()

  return {
    updateProfile: async (dto: Partial<ILoginDTO>) => {
      let status: boolean = false
      await userApi
        .updateProfile(dto)
        .then(() => {
          status = true
          if (dto.name) userStore.setName(dto.name)
          // вывод уведомления об успехе
          myNotify({
            type: 'success',
            title: global.i18n?.t('notify.success') ?? 'Успех',
            message: global.i18n?.t('editForm.status.success') ?? 'Ошибка сервера'
          })
        })
        .catch((err) => {
          // вывод уведомления об ошибке
          myNotify({
            type: 'error',
            title: global.i18n?.t('notify.error') ?? 'Ошибка',
            message: err.response.data.message ?? global.i18n?.t('editForm.status.error') ?? 'Ошибка сервера'
          })
        })
      return status
    }
  }
}

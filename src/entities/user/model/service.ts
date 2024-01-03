import { useUserApi, useUserStore } from '..'
import { IUserUpdateDTO } from './types'
import useMyNotification from '@/shared/ui-kit/composables/my-notification'
import { global } from '@/shared/composables'

export default function useUserService() {
  const userApi = useUserApi()
  const userStore = useUserStore()
  const myNotify = useMyNotification()

  return {
    getAvatar: async (): Promise<string | void> => {
      return await userApi
        .getAvatar()
        .then((res) => URL.createObjectURL(res.data))
        .catch((err) => console.log(err))
    },

    updateProfile: async (dto: Partial<IUserUpdateDTO>): Promise<boolean> => {
      let status: boolean = true
      let errorMessage: string = ''

      console.log(dto)

      // Обновление аватарки если есть
      if (dto.file) {
        const avatar = dto.file
        const formData = new FormData()
        formData.append('file', avatar)
        await userApi.updateAvatar(formData).catch((err) => {
          status = false
          errorMessage += ' ' + err.response.data.message
        })
        delete dto.file
      }

      // Обновление никнейма и пароля если есть
      if (dto.name || dto.password) {
        await userApi.updateProfile(dto).catch((err) => {
          status = false
          errorMessage = err.response.data.message
        })
      }

      // TODO: формировать уведомления динамически в зависимости от ответа (настроить DTO на бэке)
      if (status) {
        // Обновление данных о пользователе
        await userApi
          .getUserInfo()
          .then((res) => userStore.setUserInfo(res.data))
          .catch((err) => console.log(err))

        myNotify({
          type: 'success',
          title: global.i18n?.t('notify.success') ?? 'Успех',
          message: global.i18n?.t('editForm.status.success') ?? 'Профиль успешно обновлен'
        })
      } else {
        myNotify({
          type: 'error',
          title: global.i18n?.t('notify.error') ?? 'Ошибка',
          message: `${global.i18n?.t('editForm.status.error')} ${errorMessage}` ?? 'Ошибка сервера'
        })
      }

      return status
    },

    removeAccount: async () => await userApi.removeAccount().catch((err) => console.log(err))
  }
}

import { useAuthApi } from '..'
import { ILoginDTO, IRegisterDTO } from '../model/types'
import { getTokens, setTokens, removeTokens } from '../helpers/cookies'
import { useUserStore } from '@/entities/user'
import useMyNotification from '@/shared/ui-kit/composables/my-notification'
import { global } from '@/shared/composables'

export default function useAuthService() {
  const authApi = useAuthApi()
  const myNotify = useMyNotification()

  return {
    // Авторизация
    login: async (dto: ILoginDTO): Promise<boolean> => {
      const userStore = useUserStore()
      let status: boolean = false
      await authApi
        .login(dto)
        .then((res) => {
          // записываем информацию о пользователе
          userStore.setUserInfo(res.data.user)
          // записываем токен
          setTokens({
            accessToken: res.data.accessToken,
            refreshToken: res.data.refreshToken
          })
          status = true
        })
        .catch((err) => {
          // вывод уведомления об ошибке
          myNotify({
            type: 'error',
            title: global.i18n?.t('notify.error') ?? 'Ошибка',
            message: err.response.data.message ?? 'Ошибка сервера'
          })
        })
      return status
    },

    // Регистрация
    register: async (dto: IRegisterDTO) => {
      let status: boolean = false
      await authApi
        .register(dto)
        .then(() => {
          status = true
          // вывод уведомления об успехе
          myNotify({
            type: 'success',
            title: global.i18n?.t('notify.success') ?? 'Успех',
            message: global.i18n?.t('registerForm.status.success', { nickname: dto.name }) ?? 'Ошибка сервера'
          })
        })
        .catch((err) => {
          // вывод уведомления об ошибке
          myNotify({
            type: 'error',
            title: global.i18n?.t('notify.error') ?? 'Ошибка',
            message:
              `${global.i18n?.t('registerForm.status.error', {
                nickname: dto.name
              })} (${err.response.data.message})` ?? 'Ошибка сервера'
          })
        })
      return status
    },

    // Рефреш токенов
    tokenRefresh: async () => {
      const refreshToken = getTokens().refreshToken
      return await authApi.refreshTokens({ token: refreshToken })
    },

    // Логаут
    logout: () => {
      const userStore = useUserStore()
      removeTokens()
      userStore.clearState()
      global.router?.push({ name: 'auth' })
      console.clear()
    }
  }
}

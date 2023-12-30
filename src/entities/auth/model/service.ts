import { useAuthApi } from '..'
import { IAuthData } from '../model/types'
import { getTokens, setTokens, removeTokens } from '../helpers/cookies'
import { useUserStore } from '@/entities/user'
import useMyNotification from '@/shared/ui-kit/composables/my-notification'
import { global } from '@/shared/composables'

export default function useAuthService() {
  const authApi = useAuthApi()
  const myNotify = useMyNotification()

  return {
    // Авторизация
    login: async (authData: IAuthData): Promise<boolean> => {
      const userStore = useUserStore()
      let status: boolean = false
      await authApi
        .login(authData)
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
            title: 'Ошибка',
            message: err.response.data.message ?? 'Ошибка сервера'
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
      removeTokens()
      global.router?.push({ name: 'auth' })
      console.clear()
    }
  }
}

import { useAuthApi } from '..'
import { IAuthData } from '../model/types'
import { getTokens, setTokens, removeTokens } from '../helpers/cookies.helper'
import { useUserStore } from '@/entities/user/model/store'
import useMyNotification from '@/shared/ui-kit/composables/my-notification'

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
      await authApi.refreshTokens({ token: refreshToken }).then((res) => console.log(res))
    },

    // Логаут
    logout: removeTokens
  }
}

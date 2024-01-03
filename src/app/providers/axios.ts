import axios, { AxiosInstance } from 'axios'
import { useAuthService } from '@/entities/auth'
import { getTokens, setTokens, issetTokens } from '@/entities/auth/helpers/cookies'

const authService = useAuthService()

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
})

apiClient.interceptors.request.use(
  function (config) {
    // Если нет токена делаем логаут
    if (!issetTokens()) {
      authService.logout()
    }
    // Устанавливаем Bearer
    const token = getTokens().accessToken
    config.headers['Authorization'] = `Bearer ${token}`

    return config
  },

  function (error) {
    return Promise.reject(error)
  }
)

apiClient.interceptors.response.use(
  function (response) {
    return response
  },

  async function (error) {
    const originalConfig = error.config

    if (error.response.status === 401 && !error.config._isRetry) {
      originalConfig._isRetry = true

      await authService
        .tokenRefresh()
        .then((res) => setTokens(res.data))
        .catch((err) => {
          if (err.response.status === 401) {
            authService.logout()
          }
        })

      return apiClient.request(originalConfig)
    }
    return Promise.reject(error)
  }
)

export default apiClient

import apiClient from '@/app/providers/axios'
import { ILoginDTO } from '@/entities/auth/model/types'

export default function useUserApi() {
  return {
    getUserInfo: async () => await apiClient.get('users/info'),

    getAvatar: async () => await apiClient.get('users/avatar', { responseType: 'blob' }),

    updateProfile: async (dto: Partial<ILoginDTO>) => await apiClient.patch('users', dto),

    updateAvatar: async (dto: FormData) =>
      apiClient.put('/users/avatar', dto, {
        headers: { 'Content-Type': 'multipart/form-data' }
      }),

    removeAccount: async () => await apiClient.delete('/users')
  }
}

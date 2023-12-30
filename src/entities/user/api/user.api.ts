import apiClient from '@/app/providers/axios'

export default function useUserApi() {
  return {
    getUserInfo: async () => await apiClient.get('users/info'),

    getAvatar: async () =>
      await apiClient.get('users/avatar', {
        responseType: 'blob'
      })
  }
}

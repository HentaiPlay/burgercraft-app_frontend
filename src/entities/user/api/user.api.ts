import apiClient from '@/app/providers/axios'
// import { useUserStore } from '../model/store'

export default function useUserApi() {
  // const userStore = useUserStore()

  return {
    getUserInfo: async () => await apiClient.get('users/info'),

    getAvatar: async () =>
      await apiClient.get('users/avatar', {
        responseType: 'blob'
      })
  }
}

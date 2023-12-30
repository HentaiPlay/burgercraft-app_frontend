import apiClient from '@/app/providers/axios'

export default function useStatsApi() {
  return {
    getStats: async () => await apiClient.get('stats'),

    getStatsByUser: async (id: number) => await apiClient.get(`stats/${id}`)
  }
}

import apiClient from '@/app/providers/axios'

export default function useStatsApi() {
  return {
    getStats: async () => await apiClient.get('stats'),

    getStatsByUser: async () => await apiClient.get('stats/sum')
  }
}

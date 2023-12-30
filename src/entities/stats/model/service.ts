import { AxiosResponse } from 'axios'
import { useStatsApi } from '@/entities/stats'
import { useStatsStore } from '@/entities/stats'
const statsApi = useStatsApi()
const statsStore = useStatsStore()

export default function useStatsService() {
  return {
    getStats: async () => {
      await statsApi
        .getStats()
        .then((res) => statsStore.setStats(res.data))
        .catch((e) => console.log(e))
    },
    getStatsByUser: async (id: number): Promise<AxiosResponse<number>> => await statsApi.getStatsByUser(id)
  }
}

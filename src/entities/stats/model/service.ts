import { useStatsApi } from '@/entities/stats'
import { IStats } from './types'
import { AxiosResponse } from 'axios'
const statsApi = useStatsApi()

export default function useStatsService() {
  return {
    getStats: async (): Promise<AxiosResponse<IStats[]>> => await statsApi.getStats(),
    getStatsByUser: async (id: number): Promise<AxiosResponse<number>> => await statsApi.getStatsByUser(id)
  }
}

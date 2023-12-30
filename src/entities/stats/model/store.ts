import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { IStats } from './types'

export const useStatsStore = defineStore('stats', () => {
  const stats = ref<IStats[]>([])

  const hasStats = computed(() => Boolean(stats.value.length))

  function setStats(dto: IStats[]) {
    stats.value = dto
  }

  return { stats, hasStats, setStats }
})

import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { IStats } from './types'

export const useStatsStore = defineStore('stats', () => {
  const sum = ref<number | null>(null)
  const stats = ref<IStats[]>([])

  const hasSum = computed(() => sum.value !== null)
  const hasStats = computed(() => Boolean(stats.value.length))

  function setSum(dto: number) {
    sum.value = dto
  }
  function setStats(dto: IStats[]) {
    stats.value = dto
  }

  return { stats, sum, hasSum, hasStats, setSum, setStats }
})

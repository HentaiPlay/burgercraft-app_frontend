<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { RefreshRight } from '@element-plus/icons-vue'
  import { useStatsService } from '@/entities/stats'
  import { useStatsStore } from '@/entities/stats'
  import { global } from '@/shared/composables'

  const statsStore = useStatsStore()
  const statsService = useStatsService()
  const loading = ref<boolean>(false)

  const svg = `
    <path class="path" d="
      M 30 15
      L 28 17
      M 25.61 25.61
      A 15 15, 0, 0, 1, 15 30
      A 15 15, 0, 1, 1, 27.99 7.5
      L 15 15
    " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
  `

  const loadData = async () => {
    loading.value = true
    await statsService.getStats()
    loading.value = false
  }

  onMounted(async () => {
    if (!statsStore.hasStats) await loadData()
  })
</script>

<template>
  <!-- Обновить данные -->
  <div class="action">
    <el-button
      @click="loadData"
      :icon="RefreshRight"
    >
      {{ global.i18n?.t('stats.buttonLoad') }}
    </el-button>
  </div>

  <!-- Таблица -->
  <el-table
    :data="statsStore.stats"
    v-loading="loading"
    :element-loading-text="$t('stats.table.loading')"
    :element-loading-spinner="svg"
    element-loading-svg-view-box="-10, -10, 50, 50"
    element-loading-background="rgba(122, 122, 122, 0.8)"
    stripe
  >
    <el-table-column
      prop="crafterId"
      :label="global.i18n?.t('stats.table.crafterId')"
      width="180"
    />
    <el-table-column
      prop="crafterName"
      :label="global.i18n?.t('stats.table.crafterName')"
    />
    <el-table-column
      prop="amountOrders"
      :label="global.i18n?.t('stats.table.amountOrders')"
    />
    <el-table-column
      prop="summ"
      :label="global.i18n?.t('stats.table.sum')"
    />
  </el-table>
</template>

<style lang="scss" scoped>
  .action {
    @include mixins.py(20px);
  }
</style>

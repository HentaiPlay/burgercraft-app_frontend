<script setup lang="ts">
  import { computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  const route = useRoute()
  const router = useRouter()

  const menuItems = router
    .getRoutes()
    .filter((route) => (route.meta.isMenuItem && route.meta.menuOptions ? route : null))
    .sort((a, b) => {
      const first = a?.meta.menuOptions?.orderNumber
      const second = b?.meta.menuOptions?.orderNumber
      return first && second ? first - second : 0
    })

  const activeMenu = computed(() => route.matched[0]?.path)
</script>

<template>
  <!-- Меню -->
  <el-menu
    class="el-menu-vertical-demo"
    :default-active="activeMenu"
    router
  >
    <!-- Заказы -->
    <el-menu-item
      v-for="item in menuItems"
      :index="item.path"
      :key="item.name"
      :route="{ name: item.name }"
      :disabled="!item.meta.hasPermission"
    >
      <el-icon>
        <component :is="item.meta.menuOptions?.icon" />
      </el-icon>
      <span>{{ $t(item.meta.title) }}</span>
    </el-menu-item>
  </el-menu>
</template>

<style lang="scss" scoped></style>

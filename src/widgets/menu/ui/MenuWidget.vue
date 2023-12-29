<script setup lang="ts">
  import { useRoute, useRouter } from 'vue-router'
  const route = useRoute()
  const router = useRouter()
  const menuItems = router.getRoutes().filter((route) => route.meta.isMenuItem)
</script>

<template>
  <!-- Меню -->
  <el-menu
    class="el-menu-vertical-demo"
    :default-active="route.path"
    router
  >
    <!-- Заказы -->
    <el-menu-item
      v-for="(item, i) in menuItems"
      :index="item.path"
      :key="i"
      :route="{ name: item.name }"
      :disabled="!item.meta.hasPermission"
    >
      <el-icon>
        <component :is="item.meta.icon" />
      </el-icon>
      <span>{{ $t(item.meta.title) }}</span>
    </el-menu-item>
  </el-menu>
</template>

<style lang="scss" scoped></style>

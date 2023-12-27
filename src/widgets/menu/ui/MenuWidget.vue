<script setup lang="ts">
  import { useRouter, RouteRecordName } from 'vue-router'
  const router = useRouter()

  const menuItems = router.getRoutes().filter((route) => route.meta.isMenuItem)
  const redirect = (name: RouteRecordName | undefined) => router.push({ name })
</script>

<template>
  <!-- Меню -->
  <el-menu class="el-menu-vertical-demo">
    <!-- Заказы -->
    <el-menu-item
      v-for="(item, i) in menuItems"
      :index="i.toString()"
      :key="i"
      :disabled="false"
      @click="redirect(item.name)"
    >
      <el-icon>
        <component :is="item.meta.icon" />
      </el-icon>
      <span>{{ item.meta.title }}</span>
    </el-menu-item>
  </el-menu>
</template>

<style lang="scss" scoped></style>

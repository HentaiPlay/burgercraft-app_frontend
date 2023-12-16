<script setup lang="ts">
  import { useRouter } from 'vue-router'
  const route = useRouter()
  const toHome = () => route.push('/')
</script>

<template>
  <el-header class="header">
    <MyLogo
      size="min"
      show-title
      @click="toHome"
    />
  </el-header>
</template>

<style lang="scss" scoped>
  .header {
    display: flex;
    align-items: center;
    height: variables.$header-height;
    background-color: colors.$bg-color-page;
    box-shadow: 2px 2px 10px colors.$bg-color-overlay;
    z-index: 9999 !important;
  }
</style>

<script setup lang="ts">
  import { useRouter } from 'vue-router'
  const router = useRouter()

  const toAuth = () => router.push({ name: 'auth' })
  const toTest = () => router.push({ name: 'test' })
</script>

<template>
  123
  <div>
    <el-button @click="toAuth">Авторизация</el-button>
    <el-button @click="toTest">Тестовая</el-button>
  </div>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
  import { AuthForm } from '@/features/auth'
</script>

<template>
  <div class="form__wrapper">
    <AuthForm />
  </div>
</template>

<style lang="scss" scoped>
  .form__wrapper {
    height: calc(100vh - 60px);
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

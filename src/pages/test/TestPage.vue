<script setup lang="ts">
  import { useDark, useToggle } from '@vueuse/core'
  const isDark = useDark()
  const toggleDark = useToggle(isDark)
</script>

<template>
  <div class="d-flex flex-column">
    <el-button @click="toggleDark()">Сменить тему</el-button>

    <my-test-component />

    <a href="https://google.com">какая та ссылка</a>
  </div>
</template>

<style lang="scss" scoped>
  div {
    background-color: colors.$bg-color;
    color: var(--el-color-primary) !important;
    @include mixins.color-scheme(red, green);
  }
  a {
    color: colors.$primary;
  }
</style>

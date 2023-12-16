<script setup lang="ts"></script>

<template>
  <div class="default-layout">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
  .default-layout {
    height: 100vh;
    background: linear-gradient(colors.$bg-color, 85%, colors.$bg-color-page);
  }
</style>

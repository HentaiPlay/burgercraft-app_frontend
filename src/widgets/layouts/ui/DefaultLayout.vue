<script setup lang="ts"></script>

<template>
  <div class="default-layout">
    <el-container>
      <el-main class="main__content">
        <slot></slot>
      </el-main>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
  .default-layout {
    height: 100vh;
    background-size: cover;
    background-image: url('@assets/assets/images/default_layout_background.jpeg');
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(142, 115, 199, 0.25);
      z-index: 2;
    }
    .main__content {
      position: relative;
      height: 100vh;
      z-index: 3;
    }
  }
</style>

<script setup lang="ts">
  import { HeaderWidget } from '@/widgets/header'
</script>

<template>
  <div class="common-layout">
    <el-container direction="vertical">
      <HeaderWidget />
      <el-container>
        <!-- Менюшка -->
        <el-aside width="400px">Menu</el-aside>
        <el-container>
          <el-main class="main">
            <slot></slot>
          </el-main>
          <el-footer class="footer">
            Это мой учебный-демонстрационный проект
            <br />
            &#169; Все медиа файлы взяты из интернета, все права принадлежат их владельцам
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
  .main {
    height: variables.$main-height !important;
    background-color: colors.$bg-color;
  }
  .footer {
    display: flex;
    align-items: center;
    justify-content: center;
    height: variables.$footer-height;
    color: white;
    background-color: colors.$bg-color-page;
  }
</style>

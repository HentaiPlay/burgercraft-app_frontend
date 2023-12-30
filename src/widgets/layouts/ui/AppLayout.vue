<script setup lang="ts">
  import { HeaderWidget } from '@/widgets/header'
  import { AsideWidget } from '@/widgets/aside'
</script>

<template>
  <div class="common-layout">
    <el-container direction="vertical">
      <HeaderWidget />

      <el-container>
        <!-- Меню -->
        <AsideWidget />

        <!-- Контент -->
        <el-container>
          <el-main class="main">
            <slot></slot>
          </el-main>
          <el-footer class="footer">
            {{ $t('footer.line1') }}
            <br />
            &#169; {{ $t('footer.line2') }}
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
    // стили для ползунка скрола
    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-track {
      background: colors.$bg-color;
    }
    &::-webkit-scrollbar-thumb {
      background-color: colors.$primary;
      border-radius: 20px;
      border: 6px solid colors.$primary;
    }
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

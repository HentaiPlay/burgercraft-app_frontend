<script setup lang="ts">
  import { HeaderWidget } from '@/widgets/header'
  import { AsideWidget } from '@/widgets/aside'
  import { useRoute } from 'vue-router'
  const route = useRoute()
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
            <!-- Название страницы -->
            <div class="page-title">
              <h3>{{ $t(`${route.meta.title}`) }}</h3>
            </div>
            <!-- Контент роута -->
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
    .page-title {
      @include mixins.mb(20px);
      @include mixins.pa(10px);
      top: -20px;
      position: sticky;
      background-color: colors.$bg-color;
      border-bottom: 1px solid colors.$bg-color-overlay;
    }
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

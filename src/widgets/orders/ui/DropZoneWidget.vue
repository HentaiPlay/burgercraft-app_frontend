<script setup lang="ts"></script>

<template>
  <div class="preview-dropzone">
    <div class="preview-dropzone__icon">
      <el-icon :size="30"><CopyDocument /></el-icon>
    </div>
    <div class="preview-drop-zone__info">
      <span>{{ $t('dropZone.info') }}</span>
    </div>
  </div>
</template>

<style lang="scss">
  .preview-dropzone {
    height: calc(100% - 4px);
    width: calc(100% - 4px);
    border: 2px dashed colors.$bg-color-page;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: colors.$bg-color-page;
    @keyframes pulse {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.1);
      }
      100% {
        transform: scale(1);
      }
    }
    .preview-dropzone__icon {
      height: 50px;
      width: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      border: 2px dashed colors.$bg-color-page;
      animation: pulse 1.5s infinite;
      @include mixins.my(30px);
    }
    .preview-drop-zone__info {
      display: flex;
      align-items: center;
      justify-content: center;
      @include mixins.mb(30px);
    }
  }
</style>

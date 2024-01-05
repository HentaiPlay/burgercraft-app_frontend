<script setup lang="ts">
  import { ref } from 'vue'
  import { useEventBus, onClickOutside } from '@vueuse/core'
  import { IMyConfirmDialogOptions } from '../types'

  const confirmDialogRef = ref<HTMLDivElement | null>(null)
  const showDialog = ref<boolean>(false)
  const message = ref<string>('')
  const onConfirm = ref<(() => void) | null>(null)
  const onCancel = ref<(() => void) | null>(null)

  // Модалка
  const open = (options: IMyConfirmDialogOptions) => {
    showDialog.value = true
    message.value = options.message
    if (options.onConfirm) {
      onConfirm.value = options.onConfirm
    }
    setTimeout(() => confirmDialogRef.value?.focus(), 0)
  }
  const close = () => {
    message.value = ''
    onConfirm.value = null
    showDialog.value = false
    ;(onConfirm.value = null), (onCancel.value = null)
  }
  onClickOutside(confirmDialogRef, () => close())

  // Действия
  const agree = async () => {
    if (onConfirm.value) {
      await onConfirm.value()
    }
    close()
  }
  const cancel = async () => {
    if (onCancel.value) {
      await onCancel.value()
    }
    close()
  }

  // Прослушка событий
  const eventBus = useEventBus<string>('my-confirm-dialog')
  eventBus.on((key, payload) => {
    switch (key) {
      case 'open':
        open(payload)
        break
      case 'close':
        close()
        break
    }
  })

  const test = () => console.log('test')
</script>

<template>
  <teleport
    v-if="showDialog"
    to="main"
  >
    <div class="overlay"></div>
    <!-- Окно подтверждения -->
    <div
      ref="confirmDialogRef"
      class="confirm-dialog"
      tabindex="0"
      @keyup.esc="close"
    >
      <!-- Заголовок -->
      <div class="confirm-dialog__header">
        <p>{{ $t('confirm.title') }}</p>
        <div
          @click="close"
          class="header__close-icon"
        >
          <el-icon @keyup="test"><CloseBold /></el-icon>
        </div>
      </div>

      <div class="confirm-dialog__body">
        <div>{{ message }}?</div>
      </div>

      <div class="confirm-dialog__actions">
        <!-- Отменить -->
        <el-button
          @click="cancel"
          type="danger"
        >
          {{ $t('confirm.cancel') }}
        </el-button>

        <!-- Подтвердить -->
        <el-button
          @click="agree"
          type="success"
        >
          {{ $t('confirm.confirm') }}
        </el-button>
      </div>
    </div>
  </teleport>
</template>

<style lang="scss" scoped>
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
  .confirm-dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    @include mixins.pa(20px);
    border-radius: 10px;
    border: 2px solid colors.$bg-color-page;
    background-color: colors.$bg-color;
    z-index: 1000;
    .confirm-dialog__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      @include mixins.mb(10px);
      .header__close-icon {
        width: 2em;
        display: flex;
        justify-content: center;
        align-items: start;
        @include mixins.ml(10px);
        &:hover {
          cursor: pointer;
          color: colors.$primary;
        }
      }
    }
    .confirm-dialog__body {
      display: flex;
      justify-content: center;
      font-size: 0.9em;
      @include mixins.my(20px);
      @include mixins.py(30px);
      border-top: 1px solid colors.$bg-color-overlay;
      border-bottom: 1px solid colors.$bg-color-overlay;
    }
    .confirm-dialog__actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
</style>

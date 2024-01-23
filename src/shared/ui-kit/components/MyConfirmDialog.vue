<script setup lang="ts">
  import { ref } from 'vue'
  import { useEventBus } from '@vueuse/core'
  import { IMyConfirmDialogOptions } from '../types'

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
  }
  const close = () => {
    message.value = ''
    onConfirm.value = null
    showDialog.value = false
    onCancel.value = null
  }

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
</script>

<template>
  <teleport
    v-if="showDialog"
    to="body"
  >
    <!-- Окно подтверждения -->
    <el-dialog
      v-model="showDialog"
      :title="$t('confirm.title')"
      width="500"
      @close="close"
      top="35vh"
    >
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
    </el-dialog>
  </teleport>
</template>

<style lang="scss" scoped>
  .confirm-dialog__body {
    display: flex;
    justify-content: center;
    @include mixins.mb(20px);
    @include mixins.py(30px);
    border-top: 1px solid colors.$bg-color-overlay;
    border-bottom: 1px solid colors.$bg-color-overlay;
  }
  .confirm-dialog__actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>

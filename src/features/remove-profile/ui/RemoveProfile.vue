<script setup lang="ts">
  import { Delete } from '@element-plus/icons-vue'
  import { global } from '@/shared/composables'
  import useMyConfirmDialog from '@/shared/ui-kit/composables/my-confirm-dialog'
  import { useUserService } from '@/entities/user'
  import { useAuthService } from '@/entities/auth'

  const confirmDialog = useMyConfirmDialog()
  const userService = useUserService()
  const authService = useAuthService()

  const remove = () => {
    const message = global.i18n?.t('profile.confirmRemove') ?? ''
    confirmDialog({
      message: message,
      onConfirm: async () => {
        await userService.removeAccount()
        authService.logout()
      }
    })
  }
</script>

<template>
  <el-button
    @click="remove"
    :icon="Delete"
    type="danger"
  >
    {{ $t('profile.buttonRemove') }}
  </el-button>
</template>

<style lang="scss" scoped></style>

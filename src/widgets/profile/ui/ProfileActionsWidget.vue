<script lang="ts" setup>
  import { AuthRegister } from '@/features/auth-register'
  import { useUserStore } from '@/entities/user'
  import { Roles } from '@/entities/user/model/types'
  import { EditProfile } from '@/features/edit-profile'
  import { useAuthService } from '@/entities/auth'
  import { useUserService } from '@/entities/user'

  const userStore = useUserStore()
  const userService = useUserService()
  const authService = useAuthService()

  console.log(userService)
  console.log(authService)
</script>

<template>
  <div class="actions">
    <div class="actions__list">
      <span>{{ $t('profile.action') }}</span>

      <!-- Редактировать профиль -->
      <div class="delimiter">
        <EditProfile />
      </div>

      <!-- Регистариция нового пользователя -->
      <div
        v-if="userStore.role?.id === Roles.ADMIN"
        class="delimiter"
      >
        <AuthRegister />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .actions__list {
    color: colors.$bg-color-overlay;
    font-size: 0.9em;
    @include mixins.mb(20px);
    @include mixins.pb(20px);
    display: flex;
    align-items: center;
    height: 40px;
    border-bottom: solid 1px colors.$bg-color-overlay;
    .delimiter {
      @include mixins.pl(20px);
      @include mixins.ml(20px);
      border-left: 1px solid colors.$bg-color-overlay;
    }
  }
</style>

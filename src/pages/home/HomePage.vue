<script setup lang="ts">
  import { AuthRegister } from '@/features/auth-register'
  import { useUserStore } from '@/entities/user'
  import { Roles } from '@/entities/user/model/types'
  import { EditProfile } from '@/features/edit-profile'

  const userStore = useUserStore()
</script>

<template>
  <!-- Блок действий -->
  <div class="actions">
    <div class="actions__list">
      <div class="delimiter">
        <p>{{ $t('profile.action') }}</p>
      </div>
      <!-- Редактировать профиль -->
      <div class="delimiter">
        <EditProfile />
      </div>
      <!-- Регистариция нового пользователя -->
      <AuthRegister v-if="userStore.role?.id === Roles.ADMIN" />
    </div>
  </div>
  <!-- Описание должности -->
  <div>Тут описание должности</div>
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
      @include mixins.pr(20px);
      @include mixins.mr(20px);
      height: 100% !important;
      display: flex;
      align-items: center;
      border-right: 1px solid colors.$bg-color-overlay;
    }
  }
</style>

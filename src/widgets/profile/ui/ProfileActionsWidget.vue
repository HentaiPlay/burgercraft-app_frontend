<script lang="ts" setup>
  import { AuthRegister } from '@/features/auth-register'
  import { RemoveProfile } from '@/features/remove-profile'
  import { useUserStore } from '@/entities/user'
  import { Roles } from '@/entities/user/model/types'
  import { EditProfile } from '@/features/edit-profile'

  const userStore = useUserStore()
</script>

<template>
  <div class="actions">
    <div class="actions__list">
      <EditProfile />

      <div class="delimiter">
        <RemoveProfile />
      </div>

      <!-- Регистариция нового пользователя -->
      <div
        v-if="userStore.role?.id === Roles.ADMIN"
        class="list__add-user"
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
      @include mixins.mx(20px);
      border-left: 1px solid colors.$bg-color-overlay;
    }
    .list__add-user {
      @include mixins.ml(auto);
    }
  }
</style>

<script setup lang="ts">
  import { ProfileActionsWidget } from '@/widgets/profile'
  import { useUserStore } from '@/entities/user'

  const userStore = useUserStore()
</script>

<template>
  <!-- Блок действий -->
  <ProfileActionsWidget />

  <!-- Предупреждение -->
  <div class="profile-warning">
    <el-icon><WarnTriangleFilled /></el-icon>
    <span>{{ $t('profile.info.warning') }}</span>
  </div>

  <!-- Описание должности -->
  <h3>{{ $t('profile.info.welcome') }}</h3>
  <div class="profile-info">
    <el-icon><InfoFilled /></el-icon>
    <span v-html="$t(`profile.info.${userStore.role?.name}`)"></span>
  </div>
</template>

<style scoped lang="scss">
  .profile-warning {
    @include mixins.pb(20px);
    @include mixins.mb(10px);
    display: flex;
    align-items: center;
    color: colors.$warning;
    border-bottom: 1px solid colors.$bg-color-overlay;
    line-height: 1.5em;
    i {
      font-size: 1.4em;
      @include mixins.mr(10px);
    }
  }
  h3 {
    color: colors.$primary;
  }
  .profile-info {
    display: flex;
    align-items: start;
    i {
      font-size: 1.2em;
      color: colors.$primary;
      @include mixins.mr(10px);
    }
    span {
      font-size: 0.9em;
      line-height: 2em;
      color: colors.$info;
    }
  }
</style>

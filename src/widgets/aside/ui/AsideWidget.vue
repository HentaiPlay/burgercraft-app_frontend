<script setup lang="ts">
  import { watch } from 'vue'
  import { useDark, useToggle } from '@vueuse/core'
  import { Moon, Sunny, SwitchButton } from '@element-plus/icons-vue'
  import { MenuWidget } from '@/widgets/menu'
  import { UserCard } from '@/entities/user'
  import { useAuthService } from '@/entities/auth'
  import { useUserStore } from '@/entities/user/model/store'
  import { SwitchLocale } from '@/features/switch-locale'

  // Смена темы
  const isDark = useDark()
  const toggleDark = useToggle(isDark)

  const authService = useAuthService()
  const userStore = useUserStore()

  // по умолчанию темная тема
  isDark.value = true

  watch(isDark, () => toggleDark)
</script>

<template>
  <el-aside class="aside-block">
    <!-- Карточка пользователя -->
    <UserCard
      v-if="!!userStore.hasInfo"
      :name="userStore.user?.name"
      :role="userStore?.role?.name"
      class="aside-block__user-card"
    />

    <!-- Меню -->
    <MenuWidget class="aside-block__menu" />

    <div class="aside-block__footer">
      <div class="footer__switchers">
        <!-- Информация -->
        <div class="switchers__info delimiter">
          <el-tooltip placement="top">
            <template #content>
              {{ $t('aside.info.line1') }}
              <br />
              {{ $t('aside.info.line2') }}
            </template>
            <el-icon><InfoFilled /></el-icon>
          </el-tooltip>
        </div>

        <!-- Смена языка -->
        <SwitchLocale class="delimiter" />

        <!-- Смена темы -->
        <el-switch
          v-model="isDark"
          :active-action-icon="Moon"
          :inactive-action-icon="Sunny"
        />
      </div>
      <!-- Логаут -->
      <el-button
        :icon="SwitchButton"
        @click="authService.logout"
      >
        {{ $t('aside.buttonLogout') }}
      </el-button>
    </div>
  </el-aside>
</template>

<style lang="scss" scoped>
  .aside-block {
    display: flex;
    flex-direction: column;
    min-width: 380px;
    @include mixins.pa(20px);
  }
  .aside-block__user-card {
    @include mixins.no__copy;
    @include mixins.pb(20px);
    border-bottom: 1px solid colors.$bg-color;
  }
  .aside-block__menu {
    @include mixins.mt(20px);
    @include mixins.no__copy;
  }
  .aside-block__footer {
    border-top: 1px solid colors.$bg-color;
    @include mixins.mt(auto);
    @include mixins.pt(20px);
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .footer__switchers {
      display: flex;
      align-items: center;
      .switchers__info {
        display: flex;
        justify-content: end;
        font-size: 1.6em;
        > i {
          color: colors.$info;
          &:hover {
            color: colors.$primary;
            cursor: pointer;
          }
        }
      }
      .delimiter {
        @include mixins.pr(20px);
        @include mixins.mr(20px);
        border-right: 1px solid colors.$bg-color-overlay;
      }
    }
  }
</style>

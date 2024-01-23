<script setup lang="ts">
  import { useUserStore } from '../model/store'
  import { useUserService } from '..'
  import { global } from '@/shared/composables'
  import { ref, computed, watch, onMounted } from 'vue'

  const userStore = useUserStore()

  defineProps({
    name: {
      type: String,
      required: true,
      default: global.i18n?.t('userCard.unknown') ?? 'Неизвестно'
    },
    role: {
      type: String,
      required: true,
      default: global.i18n?.t('userCard.unknown') ?? 'Неизвестно'
    }
  })

  const userService = useUserService()

  const avatar = ref<string>('')
  const getAvatar = async () => {
    avatar.value = (await userService.getAvatar()) ?? ''
  }

  watch(
    computed(() => userStore.user?.avatar),
    async () => await getAvatar()
  )

  onMounted(async () => await getAvatar())
</script>

<template>
  <div class="user-card">
    <!-- Аватарка -->
    <div class="user-card__avatar">
      <img
        id="avatar"
        :src="avatar"
        :alt="$t('userCard.alt')"
      />
    </div>
    <!-- Описание -->
    <div class="user-card__description">
      <h4>{{ name }}</h4>
      <div class="role">
        <span class="role-title">{{ global.i18n?.t('userCard.position') }}:</span>
        <span>{{ role }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .user-card {
    display: flex;
    align-items: center;
  }
  .user-card__avatar {
    height: 90px;
    width: 90px;
    border-radius: 50%;
    border: 4px solid colors.$bg-color;
    overflow: hidden;
    > img {
      height: 90px;
      width: 90px;
    }
  }
  .user-card__description {
    max-width: 210px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    @include mixins.ml(20px);
    .role {
      display: flex;
      > span {
        font-size: 0.8em;
      }
      .role-title {
        @include mixins.mr(10px);
        color: colors.$bg-color-overlay;
      }
    }
  }
</style>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useUserApi } from '@/entities/user'

  defineProps({
    name: {
      type: String,
      required: true,
      default: 'Неизвестно'
    },
    role: {
      type: String,
      required: true,
      default: 'Неизвестно'
    }
  })

  const userApi = useUserApi()

  const avatar = ref('')

  onMounted(async () => {
    await userApi.getAvatar().then((res) => {
      avatar.value = URL.createObjectURL(res.data)
    })
  })
</script>

<template>
  <div class="user-card">
    <!-- Аватарка -->
    <div class="user-card__avatar">
      <img
        id="avatar"
        :src="avatar"
        alt="аватар пользователя"
      />
    </div>
    <!-- Описание -->
    <div class="user-card__description">
      <h4>{{ name }}</h4>
      <div class="role">
        <span class="role-title">Должность:</span>
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

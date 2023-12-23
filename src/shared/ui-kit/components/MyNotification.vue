<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useEventBus } from '@vueuse/core'
  import { IMyNotification, MyNotificationTypes } from '../types'

  const props = defineProps({
    maxCount: {
      type: Number,
      required: false,
      default: 2
    },
    delay: {
      type: Number,
      required: false,
      default: 3000
    },
    closeIcon: {
      type: Boolean,
      required: false,
      default: true
    }
  })

  const icon = computed((type: MyNotificationTypes) => {
    switch (type) {
      case 'info':
        return 'InfoFilled'
      case 'success':
        return 'SuccessFilled'
      case 'error':
        return 'WarningFilled'
      default:
        return 'InfoFilled'
    }
  })

  const notifications = ref<IMyNotification[]>([])

  // Создание уведомления
  const createNotification = (options: IMyNotification) => {
    if (notifications.value.length < props.maxCount) {
      notifications.value.push(options)
      setTimeout(() => removeNotification(options.id), props.delay)
    }
  }

  // Удаление уведомления
  const removeNotification = (id: string) => {
    notifications.value = notifications.value.filter((item) => item.id !== id)
  }

  // Прослушка событий
  const eventBus = useEventBus<string>('my-notification')
  eventBus.on((key, payload) => {
    if (key === 'create') createNotification(payload)
  })
</script>

<template>
  <div class="notify-wrapper">
    <transition-group name="slide-fade">
      <!-- Тело уведомления -->
      <div
        v-for="notification in notifications"
        :key="notification.id"
        :class="['notify-body', notification.type]"
      >
        <!-- Иконка статуса -->
        <el-icon class="notify-body__icon-status">
          <component :is="icon" />
        </el-icon>

        <!-- Тело -->
        <div class="notify-body__text">
          <span class="header">{{ notification.title }}</span>
          <span>{{ notification.message }}</span>
        </div>

        <!-- Иконка закрытия -->
        <div
          v-if="props.closeIcon"
          @click="removeNotification(notification.id)"
          class="notify-body__close-icon"
        >
          <el-icon>
            <CloseBold />
          </el-icon>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<style lang="scss" scoped>
  .notify-wrapper {
    position: absolute;
    width: 100%;
    min-height: 50px;
    height: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 99999;
    @include mixins.pt(10px);
  }
  .notify-body {
    width: 360px;
    display: flex;
    align-items: center;
    border-radius: 10px;
    @include mixins.py(10px);
    @include mixins.px(20px);
    @include mixins.mb(10px);
  }
  .notify-body__icon-status {
    font-size: 1.5em;
  }
  .notify-body__text {
    display: flex;
    flex-direction: column;
    font-size: 0.9em;
    @include mixins.mx(20px);
    .header {
      font-weight: bold;
      @include mixins.mb(0.4em);
    }
  }
  .notify-body__close-icon {
    font-size: 1.2em;
    @include mixins.ml(auto);
    &:hover {
      cursor: pointer;
    }
  }
  .info {
    color: colors.$primary;
    background-color: colors.$bg-color;
  }
  .success {
    color: white;
    background-color: colors.$success;
  }
  .error {
    color: white;
    background-color: colors.$error;
  }

  // transition эффект
  .slide-fade-enter-active {
    transition: all 0.4s ease-out;
  }
  .slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
  }
</style>

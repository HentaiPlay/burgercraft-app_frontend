<script setup lang="ts">
  import { useDark, useToggle } from '@vueuse/core'
  import { onMounted, ref } from 'vue'
  import { Moon, Sunny } from '@element-plus/icons-vue'

  // Тест запроса
  import { useUserApi } from '@/entities/user'
  const userApi = useUserApi()

  import useMyNotification from '@/shared/ui-kit/composables/my-notification'
  const myNotify = useMyNotification()

  import useAudioPlayer from '@/features/audio-player'
  const audioPlayer = useAudioPlayer()

  // кнопки
  const isDark = useDark()
  const toggleDark = useToggle(isDark)
  function changeTheme() {
    toggleDark()
  }
  const showNotify = () => {
    myNotify({
      type: 'success',
      title: 'Заголовок',
      message: 'Какое то сообщение'
    })
    audioPlayer('readyOrder')
  }

  // инпуты
  const input = ref('')

  // селекты
  const select = ref('')
  const options = [
    {
      value: 'Option1',
      label: 'Option1'
    },
    {
      value: 'Option2',
      label: 'Option2'
    },
    {
      value: 'Option3',
      label: 'Option3'
    },
    {
      value: 'Option4',
      label: 'Option4'
    },
    {
      value: 'Option5',
      label: 'Option5'
    }
  ]

  // свитч
  const switchVar = ref(true)

  onMounted(async () => await userApi.getUserInfo())
</script>

<template>
  <div class="d-flex flex-column">
    <!-- Кнопки -->
    <div class="buttons">
      <el-button disabled>Заблокировано</el-button>
      <el-button @click="showNotify">Уведомление</el-button>
      <el-button type="success">Принять</el-button>
      <el-button type="warning">Отклонить</el-button>
      <el-button type="danger">Удалить</el-button>
      <el-button @click="changeTheme">Сменить тему</el-button>
    </div>

    <!-- Инпуты -->
    <div class="inputs">
      <el-input
        v-model="input"
        placeholder="Please input"
      />
      <el-input
        v-model="input"
        disabled
        placeholder="Please input"
      />
    </div>

    <!-- Селекты -->
    <div class="selects">
      <!-- Обычный селект -->
      <el-select
        :clearable="true"
        collapse-tags
        v-model="select"
        placeholder="Select"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <!-- Заблокированный селект -->
      <el-select
        v-model="select"
        disabled
        placeholder="Select disable"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>

    <!-- Свитчи -->
    <div class="switch">
      <el-switch
        v-model="switchVar"
        :active-action-icon="Moon"
        :inactive-action-icon="Sunny"
      />
    </div>

    <div class="link">
      <a href="https://google.com">какая та ссылка</a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  div {
    background-color: colors.$bg-color;
  }
  .link {
    a {
      color: colors.$primary;
    }
    padding: 15px;
    background-color: colors.$bg-color-page;
  }
  .inputs {
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
    width: 800px !important;
  }
  .buttons {
    padding: 20px;
  }
  .selects {
    padding: 20px;
  }
</style>

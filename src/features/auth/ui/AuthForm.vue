<script lang="ts" setup>
  import { ref, reactive } from 'vue'
  import type { FormInstance, FormRules } from 'element-plus'
  import AuthService from '@/entities/auth/auth.service'
  import { setTokens } from '@/entities/auth/helpers/cookies.helper'
  import { useRouter } from 'vue-router'
  import useMyNotification from '@/shared/ui-kit/composables/my-notification'

  const router = useRouter()
  const myNotify = useMyNotification()

  const form = reactive({
    name: '',
    password: ''
  })

  // Ссылка шаблона на форму
  const authFormRef = ref<FormInstance>()

  // Правила валидации
  const rules = reactive<FormRules>({
    name: [
      { required: true, message: 'Обязательное поле', trigger: 'blur' },
      { min: 3, message: 'Минимум 3 символа', trigger: 'blur' }
    ],
    password: [
      { required: true, message: 'Обязательное поле', trigger: 'blur' },
      { min: 6, max: 12, message: 'Минимум 6 - максиумм 12 символов', trigger: 'blur' }
    ]
  })

  let loading = ref(false)

  const submit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    loading.value = true
    // Валидация формы
    formEl.validate(async (valid) => {
      if (valid) {
        await AuthService.login(form)
          .then((r) => {
            // записываем токен
            setTokens({
              accessToken: r.data.accessToken,
              refreshToken: r.data.refreshToken
            })
            // редирект
            router.push({ name: 'home' })
          })
          .catch((e) => {
            myNotify({
              type: 'error',
              title: 'Ошибка',
              message: e.response.data.message ?? 'Ошибка сервера'
            })
            form.password = ''
          })
      } else {
        return false
      }
    })
    loading.value = false
  }
</script>

<template>
  <div class="auth__form">
    <!-- Лого -->
    <div class="logo__wrapper">
      <MyLogo size="normal" />
    </div>

    <!-- Форма -->
    <el-form
      ref="authFormRef"
      @keyup.enter="submit(authFormRef)"
      :model="form"
      :rules="rules"
    >
      <div class="content">
        <!-- Никнейм -->
        <el-form-item prop="name">
          <el-input
            v-model="form.name"
            placeholder="Введите имя"
            :validate-event="false"
          />
        </el-form-item>

        <!-- Пароль -->
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            placeholder="Введите пароль"
            type="password"
            show-password
            :validate-event="false"
          />
        </el-form-item>
      </div>

      <!-- Войти -->
      <div class="action">
        <el-button
          @click="submit(authFormRef)"
          :loading="loading"
          :disabled="loading"
        >
          Войти
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
  .auth__form {
    height: auto;
    width: 360px;
    border-radius: 10px;
    background-color: colors.$bg-color;
    box-shadow: colors.$box-shadow;
    .logo {
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid colors.$bg-color-overlay;
      user-select: none !important;
    }
    .content {
      @include mixins.pt(20px);
      @include mixins.px(20px);
      display: flex;
      align-items: center;
      flex-direction: column;
      border-bottom: 1px solid colors.$bg-color-overlay;
    }
    .action {
      @include mixins.pa(20px);
      display: flex;
      justify-content: center;
    }
  }
</style>

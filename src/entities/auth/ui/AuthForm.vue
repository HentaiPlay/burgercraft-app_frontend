<script lang="ts" setup>
  import { ref, reactive, computed, watch } from 'vue'
  import type { FormInstance, FormRules } from 'element-plus'
  import { useAuthService } from '@/entities/auth'
  import { useRouter } from 'vue-router'
  import { setPermissions } from '@/entities/auth/helpers/roles'
  import { useUserStore } from '@/entities/user/model/store'
  import { UserFilled, Lock, InfoFilled } from '@element-plus/icons-vue'
  import { global } from '@/shared/composables'
  import { SwitchLocale } from '@/features/switch-locale'

  const router = useRouter()
  const authService = useAuthService()
  const userStore = useUserStore()
  const locale = computed(() => global.i18n?.locale.value)

  const form = reactive({
    name: '',
    password: ''
  })

  // Ссылка шаблона на форму
  const authFormRef = ref<FormInstance>()

  // Правила валидации
  const setMessage = (key: string, args?: Record<string, string | number>): string => {
    return global.i18n ? global.i18n.t(key, args || {}) : ''
  }
  const rules = computed<FormRules>(() => ({
    name: [
      { required: true, message: setMessage('rules.required'), trigger: 'blur' },
      { min: 3, message: setMessage('rules.min', { min: 3 }), trigger: 'blur' }
    ],
    password: [
      { required: true, message: setMessage('rules.required'), trigger: 'blur' },
      { min: 6, max: 12, message: setMessage('rules.min_max', { min: 6, max: 12 }), trigger: 'blur' }
    ]
  }))

  let loading = ref(false)

  const submit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    loading.value = true
    // Валидация формы
    formEl.validate(async (valid) => {
      if (valid) {
        const successLogin = await authService.login(form)
        if (successLogin) {
          // Устанавливаем пермишены для роутов и редиректим на главную
          router.options.routes = setPermissions(router.getRoutes(), userStore.role?.accessList.pages)
          router.push({ name: 'home' })
        } else {
          form.password = ''
        }
      } else {
        return false
      }
    })
    loading.value = false

    // При смене локали очищаем форму и сбрасываем валидацию
    watch(locale, () => {
      authFormRef.value?.clearValidate()
      authFormRef.value?.resetFields()
    })
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
      :validate-on-rule-change="false"
    >
      <div class="content">
        <!-- Никнейм -->
        <el-form-item prop="name">
          <el-input
            v-model="form.name"
            :placeholder="$t('authForm.namePlaceholder')"
            :validate-event="false"
            :prefix-icon="UserFilled"
          />
        </el-form-item>

        <!-- Пароль -->
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            :placeholder="$t('authForm.passwordPlaceholder')"
            type="password"
            show-password
            :validate-event="false"
            :prefix-icon="Lock"
          />
        </el-form-item>
      </div>

      <div class="action">
        <div>
          <SwitchLocale />
        </div>
        <!-- Войти -->
        <el-button
          @click="submit(authFormRef)"
          :loading="loading"
          :disabled="loading"
        >
          {{ $t('authForm.button') }}
        </el-button>

        <!-- Информация -->
        <div class="action__info">
          <el-tooltip placement="top">
            <template #content>
              {{ $t('authForm.info.line1') }}
              <br />
              {{ $t('authForm.info.line2') }}
            </template>
            <el-icon><InfoFilled /></el-icon>
          </el-tooltip>
        </div>
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
      display: grid;
      align-items: center;
      grid-template-columns: repeat(3, 1fr);
      align-content: center;
      .action__info {
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
    }
  }
</style>

<script lang="ts" setup>
  import { ref, reactive, computed } from 'vue'
  import { UserFilled, Lock } from '@element-plus/icons-vue'
  import type { FormInstance } from 'element-plus'
  import { global } from '@/shared/composables'
  import { Roles } from '@/entities/user/model/types'
  import { useAuthService } from '@/entities/auth'
  import { useAuthComposable } from '@/entities/auth'

  const authService = useAuthService()
  const authComposable = useAuthComposable()

  // Модальное окно
  const dialog = ref(false)
  const open = () => {
    dialog.value = true
  }
  const close = () => {
    dialog.value = false
  }

  let loading = ref(false)
  const roleItems = computed(() => [
    { label: global.i18n?.t('registerForm.roleItems.admin'), value: Roles.ADMIN },
    { label: global.i18n?.t('registerForm.roleItems.crafter'), value: Roles.CRAFTER }
  ])

  // Ссылка шаблона на форму
  const registerFormRef = ref<FormInstance>()

  // Форма
  const form = reactive({
    roleId: 2,
    name: '',
    password: ''
  })

  // Правила валидации
  const rules = authComposable.getRules()

  // Сабмит формы
  const submit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    loading.value = true
    // Валидация формы
    formEl.validate(async (valid) => {
      if (valid) {
        const successLogin = await authService.register(form)
        if (successLogin) {
          // Очищаем поля формы, сбрасываем валидацию и закрываем модалку
          formEl.resetFields()
          formEl.clearValidate()
          close()
        }
      } else {
        return false
      }
    })
    loading.value = false
  }
</script>

<template>
  <el-button
    @click="open"
    :icon="UserFilled"
  >
    {{ $t('profile.buttonRegister') }}
  </el-button>

  <!-- Модальное окно -->
  <el-dialog
    v-model="dialog"
    :title="$t('registerForm.title')"
    width="500"
    draggable
    @keyup.esc="close"
  >
    <!-- Информация -->
    <div class="info">
      <el-icon><InfoFilled /></el-icon>
      {{ $t('registerForm.info') }}
    </div>

    <!-- Форма -->
    <el-form
      ref="registerFormRef"
      @keyup.enter="submit(registerFormRef)"
      :model="form"
      :rules="rules"
      :validate-on-rule-change="false"
    >
      <div class="content">
        <!-- Роль -->
        <el-form-item prop="role">
          <el-select
            :clearable="true"
            collapse-tags
            v-model="form.roleId"
            :placeholder="$t('registerForm.rolePlaceholder')"
          >
            <el-option
              v-for="item in roleItems"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

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
        <el-button @click="submit(registerFormRef)">{{ $t('registerForm.button') }}</el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<style lang="scss" scoped>
  .info {
    @include mixins.mb(20px);
    @include mixins.py(20px);
    border-top: 1px solid colors.$bg-color-overlay;
    border-bottom: 1px solid colors.$bg-color-overlay;
  }
  .action {
    display: flex;
    justify-content: center;
    @include mixins.mt(20px);
    @include mixins.pt(20px);
    border-top: 1px solid colors.$bg-color-overlay;
  }
</style>

<script lang="ts" setup>
  import { ref, reactive, computed, onMounted } from 'vue'
  import { Edit, UserFilled, Lock } from '@element-plus/icons-vue'
  import type { FormInstance, FormRules } from 'element-plus'
  import { useUserService } from '@/entities/user'
  import { useUserStore } from '@/entities/user'
  import { ILoginDTO } from '@/entities/auth/model/types'
  import { global } from '@/shared/composables'

  const userStore = useUserStore()
  const userService = useUserService()

  // Модальное окно
  const dialog = ref(false)
  const open = () => {
    dialog.value = true
  }
  const close = () => {
    dialog.value = false
  }

  let loading = ref(false)

  // Ссылка шаблона на форму
  const registerFormRef = ref<FormInstance>()

  // Форма
  const form = reactive<Record<string, string>>({
    name: '',
    password: ''
  })

  const disabled = computed<boolean>(() => form.name === userStore.user?.name)

  // Установка текстовок для rules
  const setMessage = (key: string, args?: Record<string, string | number>): string => {
    return global.i18n ? global.i18n.t(key, args || {}) : ''
  }
  // Правила валидации
  const rules = computed<FormRules>(() => ({
    name: [
      { required: false, message: setMessage('rules.required'), trigger: 'blur' },
      { min: 3, message: setMessage('rules.min', { min: 3 }), trigger: 'blur' }
    ],
    password: [
      { required: false, message: setMessage('rules.required'), trigger: 'blur' },
      { min: 8, max: 20, message: setMessage('rules.min_max', { min: 8, max: 20 }), trigger: 'blur' }
    ]
  }))

  // Сабмит формы
  const submit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    loading.value = true
    // Валидация
    formEl.validate(async (valid) => {
      if (valid) {
        const dto: Partial<ILoginDTO> = Object.keys(form).reduce((reducer: Record<string, string>, key: string) => {
          if (form[key] !== '') {
            reducer[key] = form[key]
          }
          return reducer
        }, {})

        const successUpdate = await userService.updateProfile(dto)
        if (successUpdate) {
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

  onMounted(async () => {
    form.name = userStore.user?.name ?? ''
  })
</script>

<template>
  <el-button
    @click="open"
    :icon="Edit"
  >
    {{ $t('profile.buttonEdit') }}
  </el-button>

  <!-- Модальное окно -->
  <el-dialog
    v-model="dialog"
    :title="$t('editForm.title')"
    width="500"
    draggable
    @keyup.esc="close"
  >
    <!-- Форма -->
    <el-form
      ref="registerFormRef"
      @keyup.enter="submit(registerFormRef)"
      :model="form"
      :rules="rules"
      :validate-on-rule-change="false"
    >
      <div class="content">
        <!-- Никнейм -->
        <el-form-item prop="name">
          <el-input
            v-model="form.name"
            :placeholder="$t('editForm.namePlaceholder')"
            :validate-event="false"
            :prefix-icon="UserFilled"
          />
        </el-form-item>

        <!-- Пароль -->
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            :placeholder="$t('editForm.passwordPlaceholder')"
            type="password"
            show-password
            :validate-event="false"
            :prefix-icon="Lock"
          />
        </el-form-item>
      </div>

      <div class="action">
        <el-button
          @click="submit(registerFormRef)"
          :disabled="disabled"
        >
          {{ $t('editForm.button') }}
        </el-button>
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

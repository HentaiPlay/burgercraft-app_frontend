<script lang="ts" setup>
  import { ref, reactive, computed, onMounted } from 'vue'
  import { Edit, UserFilled, Lock } from '@element-plus/icons-vue'
  import type { FormInstance, FormRules } from 'element-plus'
  import { useUserService } from '@/entities/user'
  import { useUserStore } from '@/entities/user'
  import { IUserUpdateDTO } from '@/entities/user/model/types'
  import { global } from '@/shared/composables'
  import { isEqual } from 'lodash'

  const userStore = useUserStore()
  const userService = useUserService()

  // Модальное окно
  const dialog = ref(false)
  const open = () => (dialog.value = true)
  // TODO: добавить очистку формы и на событие повесить
  const close = () => {
    // Очищаем поля формы, сбрасываем валидацию и закрываем модалку
    if (editFormRef.value) {
      editFormRef.value.resetFields()
      editFormRef.value.clearValidate()
      newAvatar.value = undefined
    }
    dialog.value = false
  }

  // Во vue3 какая та проблема с макросами, причем только с defineModel
  // https://github.com/eslint/eslint/discussions/15015
  // https://www.reddit.com/r/vuejs/comments/1383stf/has_anyone_used_definemodel_yet/
  // const avatar = defineModel<File | undefined>()

  // Аватар
  const newAvatar = ref<File | undefined>()
  const currentAvatar = ref<string>('')
  const getData = async () => {
    newAvatar.value = undefined
    form.name = userStore.user?.name ?? ''
    currentAvatar.value = (await userService.getAvatar()) ?? ''
  }

  // Форма
  const editFormRef = ref<FormInstance>()
  const form = reactive<Record<string, string>>({
    name: '',
    password: ''
  })
  let loading = ref(false)

  // Если данные не изменились то дизейблим
  let initialData = reactive({})
  const disabled = computed<boolean>(() => {
    return isEqual(initialData, { ...form, avatar: newAvatar.value })
  })

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
    await formEl.validate(async (valid) => {
      if (valid) {
        // Запись никнейма и пароля если они есть
        const dto: Partial<IUserUpdateDTO> = Object.keys(form).reduce(
          (reducer: Record<string, string>, key: string) => {
            if (form[key] !== '') {
              const isUnchangedName = key === 'name' && form.name === userStore.user?.name
              if (!isUnchangedName) {
                reducer[key] = form[key]
              }
            }
            return reducer
          },
          {}
        )
        // Если есть новая аватарка
        if (newAvatar.value) {
          dto.file = newAvatar.value
        }
        // Если данных нет прерываем
        if (!Object.keys(dto).length) return false
        // Установка статуса
        const successUpdate = await userService.updateProfile(dto)
        if (successUpdate) {
          // Очищаем поля формы, сбрасываем валидацию и закрываем модалку
          formEl.resetFields()
          formEl.clearValidate()
          await getData()
          close()
        }
      } else {
        return false
      }
    })
    loading.value = false
  }

  onMounted(async () => {
    await getData()
    initialData = { ...form, avatar: newAvatar.value }
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
    @close="close"
  >
    <!-- Редактор аватара -->
    <div class="avatar">
      <MyImageUploader
        v-model="newAvatar"
        :defaultPreview="currentAvatar"
      />
    </div>

    <!-- Форма -->
    <el-form
      ref="editFormRef"
      @keyup.enter="submit(editFormRef)"
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
          @click="submit(editFormRef)"
          :disabled="disabled"
          :loading="loading"
        >
          {{ $t('editForm.button') }}
        </el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<style lang="scss" scoped>
  .avatar {
    @include mixins.mb(20px);
    border-top: 1px solid colors.$bg-color-overlay;
    border-bottom: 1px solid colors.$bg-color-overlay;
  }
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

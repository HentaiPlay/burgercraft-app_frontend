<script lang="ts" setup>
  import { ref, reactive, computed } from 'vue'
  import type { FormInstance, FormRules } from 'element-plus'
  import { CirclePlus } from '@element-plus/icons-vue'
  import { isEqual } from 'lodash'
  import { global } from '@/shared/composables'
  import { useProductsService } from '@/entities/products'
  import { IProductDTO } from '../model/types'

  const props = defineProps<{ mode: 'create' | 'edit'; product?: IProductDTO }>()
  const productsService = useProductsService()
  const baseURL: string = import.meta.env.VITE_API_URL
  const picture = ref<File | undefined>(undefined)
  const oldPicture = ref<string>('')

  // Условие для дизейбла кнопки сабмита (при редактировании)
  const disabled = computed<boolean>(() => {
    if (props.mode === 'edit') {
      const oldProductData = {
        name: props.product?.name,
        price: props.product?.price
      }
      const currentProductData = {
        name: form.name,
        price: form.price
      }
      return isEqual(oldProductData, currentProductData) && !picture.value
    } else {
      return false
    }
  })

  // Модальное окно
  const dialog = ref(false)
  const open = () => {
    dialog.value = true
    // Если это редактирование то вставляем данные
    if (props.mode === 'edit' && props.product) {
      form.name = props.product.name
      form.price = props.product.price
      oldPicture.value = `${baseURL}images/${props.product.photoPath}`
      // Для правильного опредленеия типа картинки в аплодере
      form.type = props.product.type
    }
  }
  const close = () => {
    // Очищаем поля формы, сбрасываем валидацию и закрываем модалку
    if (productFormRef.value) {
      productFormRef.value.resetFields()
      productFormRef.value.clearValidate()
      picture.value = undefined
    }
    dialog.value = false
  }

  let loading = ref(false)
  const typeItems = computed(() => [
    { label: global.i18n?.t('products.types.burger_ingredient'), value: 'burger_ingredient' },
    { label: global.i18n?.t('products.types.snack'), value: 'snack' },
    { label: global.i18n?.t('products.types.sauce'), value: 'sauce' },
    { label: global.i18n?.t('products.types.drink'), value: 'drink' }
  ])

  // Форма
  const productFormRef = ref<FormInstance>()
  const form = reactive({
    name: '',
    type: 'burger_ingredient',
    price: 0
  })

  // Установка текстовок через глобалный композабл i18n
  const setMessage = (key: string, args?: Record<string, string | number>): string => {
    return global.i18n ? global.i18n.t(key, args || {}) : ''
  }

  // Правила валидации
  const rules = computed<FormRules>(() => ({
    name: [
      { required: true, message: setMessage('rules.required'), trigger: 'blur' },
      { min: 3, message: setMessage('rules.min', { min: 3 }), trigger: 'blur' }
    ],
    type: [{ required: true, message: setMessage('rules.required'), trigger: 'blur' }],
    price: [
      { required: true, message: setMessage('rules.required'), trigger: 'blur' },
      { type: 'number', message: 'Please enter a valid number', trigger: 'blur' },
      {
        validator: (rule, value, callback) => {
          // В этом уеб***ом фреймворе ни нормальной валидации, ни импорта типов н***я тут нет
          if (!rule) return
          return value < 5 || value > 500
            ? callback(new Error(setMessage('rules.min_max', { min: 5, max: 500 })))
            : callback()
        },
        trigger: 'blur'
      }
    ]
  }))

  // Сабмит формы
  const submit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    loading.value = true
    // Валидация формы
    formEl.validate(async (valid) => {
      if (valid) {
        let status: boolean = false
        // Опредление запроса в зависимости от режима формы
        switch (props.mode) {
          case 'create':
            status = await productsService.createProduct({ file: picture.value, ...form })
            break
          case 'edit':
            status = await productsService.updateProduct({ id: props.product?.id ?? 0, file: picture.value, ...form })
            break
        }

        await productsService.setProducts()
        if (status) {
          // Обновляем список продуктов
          await productsService.setProducts()
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
  <!-- Режим создания -->
  <el-button
    v-if="props.mode === 'create'"
    @click="open"
    :icon="CirclePlus"
  >
    {{ $t('products.buttonCreate') }}
  </el-button>

  <!-- Режим редактирования -->
  <el-icon
    v-if="props.mode === 'edit'"
    @click="open"
    class="edit-icon"
  >
    <Edit />
  </el-icon>

  <!-- Модальное окно -->
  <teleport
    v-if="dialog"
    to="body"
  >
    <el-dialog
      v-model="dialog"
      :title="$t(`products.form.${$props.mode}.title`)"
      width="500"
      draggable
      @close="close"
    >
      <!-- Редактор картинки -->
      <div class="pucture">
        <MyImageUploader
          v-model="picture"
          :horizontal="form.type === 'burger_ingredient'"
          :defaultPreview="oldPicture"
        />
      </div>

      <!-- Форма -->
      <el-form
        ref="productFormRef"
        @keyup.enter="submit(productFormRef)"
        :model="form"
        :rules="rules"
        :validate-on-rule-change="false"
      >
        <div class="content">
          <!-- Название -->
          <el-form-item prop="name">
            <el-input
              v-model="form.name"
              :placeholder="$t('products.form.namePlaceholder')"
              :validate-event="false"
            />
          </el-form-item>

          <!-- Тип продукта -->
          <el-form-item
            v-if="props.mode === 'create'"
            prop="type"
          >
            <el-select
              collapse-tags
              v-model="form.type"
              :placeholder="$t('products.form.typePlaceholder')"
            >
              <el-option
                v-for="item in typeItems"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>

          <!-- Цена -->
          <el-form-item prop="price">
            <el-input
              v-model.number="form.price"
              :placeholder="$t('products.form.pricePlaceholder')"
              :validate-event="false"
            />
          </el-form-item>
        </div>

        <div class="action">
          <el-button
            @click="submit(productFormRef)"
            :disabled="disabled"
          >
            {{ $t(`products.form.${props.mode}.button`) }}
          </el-button>
        </div>
      </el-form>
    </el-dialog>
  </teleport>
</template>

<style lang="scss" scoped>
  .edit-icon {
    color: colors.$bg-color-page;
    &:hover {
      cursor: pointer;
      color: colors.$primary;
    }
  }
  .action {
    display: flex;
    justify-content: center;
    @include mixins.mt(20px);
    @include mixins.pt(20px);
    border-top: 1px solid colors.$bg-color-overlay;
  }
  .pucture {
    @include mixins.mb(20px);
    border-top: 1px solid colors.$bg-color-overlay;
    border-bottom: 1px solid colors.$bg-color-overlay;
  }
</style>

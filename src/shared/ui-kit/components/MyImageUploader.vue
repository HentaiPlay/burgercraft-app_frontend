<script lang="ts" setup>
  import { ref, computed, watch } from 'vue'

  const baseURL: string = import.meta.env.VITE_API_URL
  const noImageUrl = `${baseURL}images/no_image.jpg`

  const file = ref<File | undefined>()
  const previewUploaded = ref<string>('')

  const emit = defineEmits(['update:modelValue'])

  const props = defineProps({
    modelValue: {
      required: false
    },
    defaultPreview: {
      type: String,
      required: false,
      default: ''
    },
    horizontal: {
      type: Boolean,
      required: false,
      default: false
    }
  })

  // Ссылка для превью
  const currentUrl = computed(() => {
    switch (true) {
      // Если есть что показать для предпросмотра то показываем
      case previewUploaded.value !== '':
        return previewUploaded.value
      // Если есть дефолтная картинка то выводим ее
      case props.defaultPreview !== '':
        return props.defaultPreview
      // Если показывать нечего выводим no image
      default:
        return noImageUrl
    }
  })

  const upload = () => document.getElementById('fileUploader')?.click()

  const onChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    file.value = target.files?.[0]
    if (file.value) {
      previewUploaded.value = URL.createObjectURL(file.value)
    }
    // Обновляем связку с v-model
    emit('update:modelValue', file.value)
  }

  const remove = () => {
    // Очищаем буфер с файлом
    const input = document.getElementById('fileUploader') as HTMLInputElement
    input.value = ''
    // Очищаем состояние
    file.value = undefined
    previewUploaded.value = ''
    // Обновляем связку с v-model
    emit('update:modelValue', file.value)
  }

  // Обновляем превью и чистим файл
  watch(
    computed(() => props.modelValue),
    () => {
      if (typeof props.modelValue === 'undefined') {
        remove()
      }
    }
  )
</script>

<template>
  <div class="image-uploader">
    <!-- Инпут куда файл грузим -->
    <input
      v-show="false"
      type="file"
      name="fields[fileUploader][]"
      id="fileUploader"
      @input="onChange"
    />

    <!-- Предпросмотр -->
    <div :class="{ 'image-uploader__preview': true, 'horizontal-image-uploader__preview': props.horizontal }">
      <div class="preview__actions">
        <div class="actions__icons">
          <!-- Загрузка -->
          <el-icon @click="upload"><Camera /></el-icon>
          <!-- Удаление -->
          <el-icon
            v-if="!!file"
            @click="remove"
          >
            <DeleteFilled />
          </el-icon>
        </div>
      </div>

      <img
        :src="currentUrl"
        alt="image"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .image-uploader {
    @include mixins.pa(10px);
    display: flex;
    align-items: center;
    justify-content: center;
    .image-uploader__preview {
      position: relative;
      height: 200px;
      width: 200px;
      border-radius: 10px;
      border: 4px solid colors.$bg-color-overlay;
      overflow: hidden !important;
      > img {
        height: 200px;
        width: 200px;
      }
      .preview__actions {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 0.3s;
        &:hover {
          background-color: rgba(1, 1, 1, 0.77);
        }
        &:hover .actions__icons {
          display: flex;
        }
        .actions__icons {
          display: none;
          width: 100%;
          @include mixins.px(20px);
          color: colors.$primary;
          font-size: 2.4em;
          transition: 0.3s;
          justify-content: space-evenly;
          > i {
            &:hover {
              cursor: pointer;
              color: colors.$bg-color-page;
            }
          }
        }
      }
    }
  }
  .horizontal-image-uploader__preview {
    height: 200px !important;
    width: 600px !important;
    > img {
      height: 200px !important;
      width: 600px !important;
    }
  }
</style>

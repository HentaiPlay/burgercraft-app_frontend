import { useProductsStore } from '..'
import { useProductsApi } from '@/entities/products'
import { ICreateProductDTO, IUpdateProductDTO, IProductDTO } from './types'
import { global, useMyNotification } from '@/shared/composables'

export default function useUserService() {
  const productsStore = useProductsStore()
  const productsApi = useProductsApi()
  const myNotify = useMyNotification()

  return {
    setProducts: async (): Promise<IProductDTO[] | void> => {
      return await productsApi
        .getProducts()
        .then((res) => productsStore.setAllProducts(res.data))
        .catch((err) => console.log(err))
    },

    createProduct: async (dto: ICreateProductDTO): Promise<boolean> => {
      let status: boolean = false
      let formData: FormData | null = null

      // Записываем данные нужные для изображения
      if (dto.file) {
        const picture = dto.file
        formData = new FormData()
        formData.append('data', JSON.stringify({ name: dto.name, type: dto.type }))
        formData.append('file', picture)
      }
      delete dto.file

      // Сохраняем данные по продукту
      await productsApi
        .createProduct(dto)
        .then(() => {
          status = true
        })
        .catch((err) => {
          myNotify({
            type: 'error',
            title: global.i18n?.t('notify.error') ?? 'Ошибка',
            message: err.response.data.message ?? 'Ошибка сервера'
          })
        })

      // Сохранение картинки если есть
      if (status && formData) {
        await productsApi.uploadPicture(formData).catch((err) => {
          status = false
          myNotify({
            type: 'error',
            title: global.i18n?.t('notify.error') ?? 'Ошибка',
            message: err.response.data.message ?? 'Ошибка сервера'
          })
        })
      }

      // Если всьо ок кидаем уведомление
      if (status) {
        myNotify({
          type: 'success',
          title: global.i18n?.t('notify.success') ?? 'Успех',
          message: global.i18n?.t('products.form.create.success') ?? 'Продукт успешно создан'
        })
      }

      return status
    },

    updateProduct: async (dto: IUpdateProductDTO): Promise<boolean> => {
      let status: boolean = false
      let formData: FormData | null = null

      // Записываем данные нужные для изображения
      if (dto.file && dto.type) {
        const picture = dto.file
        formData = new FormData()
        formData.append('data', JSON.stringify({ name: dto.name, type: dto.type }))
        formData.append('file', picture)
      }

      delete dto.type
      delete dto.file

      // Сохраняем данные по продукту
      await productsApi
        .updateProduct(dto)
        .then(() => (status = true))
        .catch((err) => {
          myNotify({
            type: 'error',
            title: global.i18n?.t('notify.error') ?? 'Ошибка',
            message: err.response.data.message ?? 'Ошибка сервера'
          })
        })

      // Сохранение картинки если есть
      if (formData && status) {
        await productsApi
          .uploadPicture(formData)
          .then(() => (status = true))
          .catch((err) => {
            status = false
            myNotify({
              type: 'error',
              title: global.i18n?.t('notify.error') ?? 'Ошибка',
              message: err.response.data.message ?? 'Ошибка сервера'
            })
          })
      }

      // Если всьо ок кидаем уведомление
      if (status) {
        myNotify({
          type: 'success',
          title: global.i18n?.t('notify.success') ?? 'Успех',
          message: global.i18n?.t('products.form.edit.success') ?? 'Продукт успешно отредактирован'
        })
      }

      return status
    }
  }
}

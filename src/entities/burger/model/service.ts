import { useBurgerApi, useBurgerStore } from '@/entities/burger'
import { useOrdersStore, useOrdersService } from '@/entities/orders'
import { global, useMyNotification } from '@/shared/composables'
import { ICreateBurgerDTO, IUpdateBurgerDTO } from './types'

export default function useBurgerService() {
  const burgerApi = useBurgerApi()
  const burgerStore = useBurgerStore()
  const ordersStore = useOrdersStore()
  const ordersService = useOrdersService()
  const myNotify = useMyNotification()

  return {
    getBurger: async (id: number) => {
      return await burgerApi.getBurger(id)
    },

    // Создание бургера
    createBurger: async () => {
      let success: boolean = false
      // Если заказ уже был создан то бургеры изменяются отдельными запросами
      if (ordersStore.activeOrder.id) {
        // Устанавливаем ID заказа в активный бургер
        burgerStore.setOrderId(ordersStore.activeOrder.id)
        const dto = burgerStore.burger as ICreateBurgerDTO
        delete dto.price

        await burgerApi
          .createBurger(dto)
          .then(() => (success = true))
          .catch((err) => {
            success = false
            myNotify({
              title: global.i18n?.t('burger.form.create.status.error') ?? 'Ошибка',
              type: 'error',
              message: err.response.data.message
            })
          })

        // Обновляем состояние активного заказа
        if (success) {
          // Выводим уведомление
          myNotify({
            title: global.i18n?.t('notify.success') ?? 'Успех',
            type: 'success',
            message: global.i18n?.t('burger.form.create.status.success') ?? ''
          })
          await ordersService.setOrder(ordersStore.activeOrder.id)
        } else {
          return
        }
      } else {
        ordersStore.addBurger(burgerStore.burger)
      }
    },

    // Обновление бургера
    editBurger: async (index?: number) => {
      let success: boolean = false
      // Если заказ уже был создан то бургеры изменяются отдельными запросами
      if (ordersStore.activeOrder.id && burgerStore.burger.id) {
        const dto = burgerStore.burger as IUpdateBurgerDTO

        await burgerApi
          .editBurger(dto)
          .then(() => (success = true))
          .catch((err) => {
            success = false
            myNotify({
              title: global.i18n?.t('burger.form.edit.status.error') ?? 'Ошибка',
              type: 'error',
              message: err.response.data.message
            })
          })

        // Обновляем состояние активного заказа
        if (success) {
          // Выводим уведомление
          myNotify({
            title: global.i18n?.t('notify.success') ?? 'Успех',
            type: 'success',
            message: global.i18n?.t('burger.form.edit.status.success') ?? ''
          })
          await ordersService.setOrder(ordersStore.activeOrder.id)
        } else {
          return
        }
      } else {
        if (typeof index === 'number') {
          ordersStore.editBurger(burgerStore.burger, index)
        }
      }
    },

    // Удаление бургера
    removeBurger: async (index: number) => {
      let success: boolean = false
      const burgerId: number | null = ordersStore.activeOrder.burgers[index].id ?? null
      // Если заказ уже был создан то бургеры изменяются отдельными запросами
      if (ordersStore.activeOrder.id && burgerId) {
        await burgerApi
          .removeBurger(burgerId)
          .then(() => (success = true))
          .catch((err) => {
            success = false
            myNotify({
              title: global.i18n?.t('burger.form.remove.status.error') ?? 'Ошибка',
              type: 'error',
              message: err.response.data.message
            })
          })

        // Обновляем состояние активного заказа
        if (success) {
          // Выводим уведомление
          myNotify({
            title: global.i18n?.t('notify.success') ?? 'Успех',
            type: 'success',
            message: global.i18n?.t('burger.form.remove.status.success') ?? ''
          })
          await ordersService.setOrder(ordersStore.activeOrder.id)
        } else {
          return
        }
      } else {
        ordersStore.removeBurger(index)
      }
    }
  }
}

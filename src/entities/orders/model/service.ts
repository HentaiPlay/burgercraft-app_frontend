import { global, useMyNotification, useAudioPlayer } from '@/shared/composables'
import { useOrdersApi, useOrdersStore } from '@/entities/orders'
import { useStatsService } from '@/entities/stats'
import { IChangeStatusDTO, ICreateOrderDTO, IUpdateOrderDTO, StatusOrderEnum } from './types'

export default function useOrdersService() {
  const ordersApi = useOrdersApi()
  const ordersStore = useOrdersStore()
  const myNotify = useMyNotification()
  const audioPlayer = useAudioPlayer()

  return {
    setOrderList: async () => {
      await ordersApi
        .getOrdersList()
        .then((res) => ordersStore.setOrderList(res.data))
        .catch((err) => console.log(err))
    },

    setOrder: async (id: number) => {
      await ordersApi
        .getOrder(id)
        .then((res) => ordersStore.setActiveOrder(res.data))
        .catch((err) => console.log(err))
    },

    createOrder: async (dto: ICreateOrderDTO) => {
      await ordersApi
        .createOrder(dto)
        .then(() =>
          myNotify({
            title: global.i18n?.t('orders.form.create.status.success') ?? 'Заказ успешно создан',
            type: 'success',
            message: ''
          })
        )
        .catch((err) =>
          myNotify({
            title: global.i18n?.t('orders.form.create.status.error') ?? 'Ошибка при создании заказа',
            type: 'error',
            message: err.response.data.message
          })
        )
    },

    editOrder: async (dto: IUpdateOrderDTO) => {
      await ordersApi
        .updateOrder(dto)
        .then(() =>
          myNotify({
            title: global.i18n?.t('orders.form.edit.status.success') ?? 'Заказ успешно обновлен',
            type: 'success',
            message: ''
          })
        )
        .catch((err) =>
          myNotify({
            title: global.i18n?.t('orders.form.edit.status.error') ?? 'Ошибка при обновлении заказа',
            type: 'error',
            message: err.response.data.message
          })
        )
    },

    changeStatus: async (dto: IChangeStatusDTO) => {
      const statsService = useStatsService()
      await ordersApi
        .changeStatus(dto)
        .then(async () => {
          myNotify({
            title: global.i18n?.t('orders.form.edit.status.success') ?? 'Заказ успешно обновлен',
            type: 'success',
            message: ''
          })
          // Воспроизводим звук при готовом заказе и при отмене
          switch (dto.status) {
            case StatusOrderEnum.READY:
              audioPlayer('readyOrder')
              // Обновляем сумму заработка если заказ выполнен
              await statsService.getStatsByUser()
              break
            case StatusOrderEnum.CANCELED:
              audioPlayer('deleted')
              break
          }
        })
        .catch((err) =>
          myNotify({
            title: global.i18n?.t('orders.form.edit.status.error') ?? 'Ошибка при обновлении заказа',
            type: 'error',
            message: err.response.data.message
          })
        )
    }
  }
}

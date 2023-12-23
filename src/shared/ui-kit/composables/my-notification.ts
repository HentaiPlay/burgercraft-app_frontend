import { useEventBus } from '@vueuse/core'
import { MyNotificationOptions } from '../types'

// Задаем идентификатор для шины событий на ключ компонента уведомлений
const eventBus = useEventBus<string>('my-notification')

export default function useMyNotification() {
  // генерация id уведомления
  const generateId = (): string => {
    let dateTime = new Date().getTime()
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (dateTime + Math.random() * 16) % 16 | 0
      dateTime = Math.floor(dateTime / 16)
      return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16)
    })
    return uuid
  }

  // Эмит события на создание уведомления
  const createNotification = (options: MyNotificationOptions) => {
    eventBus.emit('create', { id: generateId(), ...options })
  }

  return createNotification
}

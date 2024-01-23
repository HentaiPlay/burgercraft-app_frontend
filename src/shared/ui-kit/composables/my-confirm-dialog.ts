import { useEventBus } from '@vueuse/core'
import { IMyConfirmDialogOptions } from '../types'

// Задаем идентификатор для шины событий на ключ компонента окна подтверждений
const eventBus = useEventBus<string>('my-confirm-dialog')

export default function useMyConfirmDialog() {
  return async (payload: IMyConfirmDialogOptions) => {
    eventBus.emit('open', payload)
  }
}

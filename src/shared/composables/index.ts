// TODO: Возможно стоит их зарегистрировать через provide/inject для DI

// Импорт composable функций из ui kit
import { useMyNotification, useMyConfirmDialog } from '../ui-kit/composables'

// Обычные композаблы
import global from './global'
import useAudioPlayer from './audio-player'

export { global, useAudioPlayer, useMyNotification, useMyConfirmDialog }

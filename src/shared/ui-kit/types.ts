/**
 * MyNotifications types
 */

export interface IMyNotification {
  id: string
  type: MyNotificationTypes
  title: string
  message: string
}

export type MyNotificationTypes = 'info' | 'success' | 'error'

export type MyNotificationOptions = Omit<IMyNotification, 'id'>

export type MyNotificationCall = () => void

/**
 * MyConfirmDialog types
 */

export interface IMyConfirmDialogOptions {
  message: string
  onConfirm: (() => void) | null
  onCancel?: (() => void) | null
}

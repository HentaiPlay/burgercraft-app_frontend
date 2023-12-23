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

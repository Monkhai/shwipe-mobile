import { queryKeystore } from '@/queries/queryKeystore'
import * as Notifications from 'expo-notifications'
import React, { useEffect } from 'react'

import { queryClient } from '../QueryProvider'
import { BaseNotificationData, NotificationType } from './notfiicationTypes'

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const notificationListener = Notifications.addNotificationReceivedListener(handleNotification)
    const responseListener = Notifications.addNotificationResponseReceivedListener(handleResponse)

    return () => {
      notificationListener.remove()
      responseListener.remove()
    }
  }, [])

  return <>{children}</>
}

async function handleNotification(notification: Notifications.Notification) {
  const data = notification.request.content.data as BaseNotificationData
  switch (data.type) {
    case NotificationType.FRIEND_REQUEST_SENT: {
      await invalidateQueries()
      break
    }
    case NotificationType.FRIEND_REQUEST_UPDATED: {
      await invalidateQueries()
      break
    }
    default: {
      console.log('Unknown notification type', data.type)
      break
    }
  }
}

async function handleResponse(response: Notifications.NotificationResponse) {
  const data = response.notification.request.content.data as BaseNotificationData
  console.log('notification received', data)
  switch (data.type) {
    case NotificationType.FRIEND_REQUEST_SENT: {
      invalidateQueries()
      break
    }
    case NotificationType.FRIEND_REQUEST_UPDATED: {
      invalidateQueries()
      break
    }
    default: {
      console.log('Unknown notification type', data.type)
      break
    }
  }
}

async function invalidateQueries() {
  await Promise.all([
    queryClient.invalidateQueries({ queryKey: queryKeystore.receivedFriendRequests }),
    queryClient.invalidateQueries({ queryKey: queryKeystore.sentFriendRequests }),
    queryClient.invalidateQueries({ queryKey: queryKeystore.friends }),
  ])
}

import { queryKeystore } from '@/queries/queryKeystore'
import * as Notifications from 'expo-notifications'
import React, { useEffect } from 'react'

import { queryClient } from '../QueryProvider'
import {
  BaseNotificationData,
  GroupInvitationNotificationData,
  NotificationType,
  SessionInvitationNotificationData,
} from './notfiicationTypes'
import { ConnectionState, useWebsocketStore } from '@/zustand/websocketStore'
import { useSessionStore } from '@/zustand/sessionStore'
import { ClientMessageType, JoinSessionMessage, UnsignedBaseClientMessage } from '@/wsHandler/clientMessagesTypes'
import { sleep } from '@/utils/sleep'
import { router } from 'expo-router'

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
  console.log('notification received', data.type)
  switch (data.type) {
    case NotificationType.FRIEND_REQUEST_SENT: {
      await invalidateFriendsQueries()
      break
    }
    case NotificationType.FRIEND_REQUEST_UPDATED: {
      await invalidateFriendsQueries()
      break
    }
    case NotificationType.SESSION_INVITATION: {
      await invalidateFriendsQueries()
      break
    }
    case NotificationType.GROUP_INVITATION: {
      await invalidateGroupsQueries()
      break
    }
    case NotificationType.GROUP_INVITATION_UPDATED: {
      await invalidateGroupsQueries()
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
  console.log('notification response received', data.type)
  switch (data.type) {
    case NotificationType.FRIEND_REQUEST_SENT: {
      invalidateFriendsQueries()
      break
    }
    case NotificationType.FRIEND_REQUEST_UPDATED: {
      invalidateFriendsQueries()
      break
    }
    case NotificationType.SESSION_INVITATION: {
      const { sessionId } = data as SessionInvitationNotificationData
      if (!sessionId) {
        console.log('No session id found')
        return
      }
      const { sendMessage, connectToWebSocket } = useWebsocketStore.getState()
      connectToWebSocket()

      let maxTries = 10
      for (let tries = 0; tries < maxTries; tries++) {
        const connectionState = useWebsocketStore.getState().connectionState
        const sessionIdFromStore = useSessionStore.getState().sessionId
        if (sessionIdFromStore) {
          break
        }

        if (connectionState === ConnectionState.CONNECTED) {
          const joinSessionMessage: UnsignedBaseClientMessage<JoinSessionMessage> = {
            type: ClientMessageType.JOIN_SESSION_MESSAGE_TYPE,
            session_id: sessionId,
          }
          console.log('Sending join session message', joinSessionMessage)
          sendMessage(joinSessionMessage)
        }
        await sleep(1)
      }
      console.log('Joined session', sessionId)
      break
    }
    case NotificationType.GROUP_INVITATION: {
      await invalidateGroupsQueries()
      const data = response.notification.request.content.data as GroupInvitationNotificationData
      router.push(`/(auth)/${data.groupId}/group-invitation`)
      break
    }
    case NotificationType.GROUP_INVITATION_UPDATED: {
      await invalidateGroupsQueries()
      break
    }
    default: {
      console.log('Unknown notification type', data.type)
      break
    }
  }
}

async function invalidateFriendsQueries() {
  await Promise.all([
    queryClient.invalidateQueries({ queryKey: queryKeystore.receivedFriendRequests }),
    queryClient.invalidateQueries({ queryKey: queryKeystore.sentFriendRequests }),
    queryClient.invalidateQueries({ queryKey: queryKeystore.friends }),
  ])
}

async function invalidateGroupsQueries() {
  await Promise.all([
    queryClient.invalidateQueries({ queryKey: queryKeystore.groups }),
    queryClient.invalidateQueries({ queryKey: queryKeystore.groupInvitations }),
  ])
}

import { BaseClientMessage, ClientMessageType, StartSessionMessage, UnsignedBaseClientMessage } from '@/wsHandler/clientMessagesTypes'
import {
  BaseServerMessage,
  JointSessionMessage,
  MatchFoundMessage,
  RestaurantUpdateMessage,
  ServerErrorMessage,
  ServerMessageType,
  SessionCreatedMessage,
  SessionStartMessage,
  UpdateUserListMessage,
} from '@/wsHandler/serverMessagesTypes'
import { WebsocketHandler } from '@/wsHandler/websocketHandler'
import { router } from 'expo-router'
import { create } from 'zustand'
import { useSessionStore } from './sessionStore'

export enum ConnectionState {
  LOADING = 'loading',
  CONNECTED = 'connected',
  DISCONNECTED = 'disconnected',
}

type WebSocketStore = {
  __ws: WebsocketHandler | null
  isOpen: boolean
  connectionState: ConnectionState

  connectToWebSocket: () => void
  sendMessage: (message: UnsignedBaseClientMessage<BaseClientMessage>) => void
  startSession: () => void
}

export const useWebsocketStore = create<WebSocketStore>()((set, get) => ({
  __ws: null,
  isOpen: false,
  connectionState: ConnectionState.DISCONNECTED,

  connectToWebSocket: () => {
    if (get().__ws) {
      return
    }
    set({ connectionState: ConnectionState.LOADING })
    const ws = new WebsocketHandler({
      onError(error) {
        console.log('error', error)
        if (error instanceof Error) {
          if (error.message === "The operation couldn't be completed. Connection refused") {
            console.log('Connection refused')
            const currentConnectionState = get().connectionState
            if (currentConnectionState !== ConnectionState.DISCONNECTED) {
              set({ connectionState: ConnectionState.DISCONNECTED })
            }
          } else {
            console.error('Error connecting to websocket', error)
          }
        }
        return
      },
      onOpen() {
        set({ isOpen: true })
        console.log('WebSocket connected')
        return
      },
      onClose() {
        set({ isOpen: false, __ws: null, connectionState: ConnectionState.DISCONNECTED })
        const sessionStore = useSessionStore.getState()
        sessionStore.__resetAll()
        // router.dismissTo('/home')

        return
      },
      onMessage(event) {
        try {
          const message = JSON.parse(event.data) as BaseServerMessage

          console.log('message', message.type)

          switch (message.type) {
            case ServerMessageType.LOADING_CONNECTION_MESSAGE_TYPE: {
              set({ connectionState: ConnectionState.LOADING })
              break
            }
            case ServerMessageType.CONNECTION_ESTABLISHED_MESSAGE_TYPE: {
              set({ connectionState: ConnectionState.CONNECTED })
              break
            }
            case ServerMessageType.ERROR_MESSAGE_TYPE: {
              const errorMessage = message as ServerErrorMessage
              console.log('Error message', errorMessage.error)
              break
            }
            case ServerMessageType.UPDATE_RESTAURANTS_MESSAGE_TYPE: {
              const restaurantUpdateMessage = message as RestaurantUpdateMessage
              const sessionStore = useSessionStore.getState()
              const oldRestaurants = sessionStore.restaurants ?? []
              sessionStore.__setRestaurants([...oldRestaurants, ...restaurantUpdateMessage.restaurants])
              break
            }
            case ServerMessageType.SESSION_START_MESSAGE_TYPE: {
              const sessionStartMessage = message as SessionStartMessage
              const sessionStore = useSessionStore.getState()
              sessionStore.__setSessionId(sessionStartMessage.session_id)
              sessionStore.__setUsers(sessionStartMessage.users)
              sessionStore.__setRestaurants(sessionStartMessage.restaurants)
              sessionStore.__setIsSessionStarted(true)
              break
            }
            case ServerMessageType.SESSION_CREATED_MESSAGE_TYPE: {
              const sessionCreatedMessage = message as SessionCreatedMessage
              const sessionStore = useSessionStore.getState()
              sessionStore.__setSessionId(sessionCreatedMessage.session_id)
              sessionStore.__setUsers(sessionCreatedMessage.users)
              router.push(`/session/${sessionCreatedMessage.session_id}`)
              break
            }
            case ServerMessageType.JOINT_SESSION_MESSAGE_TYPE: {
              const jointSessionMessage = message as JointSessionMessage
              const sessionStore = useSessionStore.getState()
              sessionStore.__setSessionId(jointSessionMessage.session_id)
              sessionStore.__setUsers(jointSessionMessage.users)
              sessionStore.__setRestaurants(jointSessionMessage.restaurants)
              sessionStore.__setIsSessionStarted(jointSessionMessage.is_started)
              router.push(`/session/${jointSessionMessage.session_id}`)
              break
            }
            case ServerMessageType.UPDATE_USER_LIST_MESSAGE_TYPE: {
              const userJointSessionMessage = message as UpdateUserListMessage
              const sessionStore = useSessionStore.getState()
              const sessionId = sessionStore.sessionId
              if (sessionId !== userJointSessionMessage.session_id) {
                console.error('message sent to wrong session person')
                return
              }
              sessionStore.__setUsers(userJointSessionMessage.users)
              break
            }
            case ServerMessageType.SESSION_CLOSED_MESSAGE_TYPE: {
              const sessionStore = useSessionStore.getState()
              sessionStore.__resetAll()
              console.log('Session closed, redirecting to home')
              router.dismissTo('/(auth)/home')
              break
            }
            case ServerMessageType.MATCH_FOUND_MESSAGE_TYPE: {
              const matchFoundMessage = message as MatchFoundMessage
              const sessionStore = useSessionStore.getState()
              sessionStore.__setMatchedRestaurantIndex(matchFoundMessage.restaurant_index)
              break
            }
            case ServerMessageType.REMOVED_FROM_SESSION_MESSAGE_TYPE: {
              const sessionStore = useSessionStore.getState()
              sessionStore.__resetAll()
              router.dismissTo('/home')
              break
            }
            default: {
              console.log('Unknown message type', message.type)
              break
            }
          }
        } catch (error) {
          console.error('Error parsing message', error)
          return
        }
      },
    })
    set({ __ws: ws })
    ws.connect('ws://192.168.1.89:8080/ws')
  },
  sendMessage: (message: Omit<BaseClientMessage, 'token_id'>) => {
    const ws = useWebsocketStore.getState().__ws
    ws?.sendMessage(message)
  },
  startSession() {
    const sessionId = useSessionStore.getState().sessionId
    if (!sessionId) {
      console.warn('startSession was called without sessionId')
      return
    }
    const startSessionMessage: UnsignedBaseClientMessage<StartSessionMessage> = {
      type: ClientMessageType.START_SESSION_MESSAGE_TYPE,
      session_id: sessionId,
    }
    const sendMessage = get().sendMessage
    sendMessage(startSessionMessage)
  },
}))

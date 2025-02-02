import { store, userAtom } from '@/jotai/authAtom'
import { BaseClientMessage, UnsignedBaseClientMessage } from './clientMessagesTypes'
import * as Location from 'expo-location'

export class WebsocketHandler {
  private onOpen: () => void
  private onClose: () => void
  private onMessage: (event: MessageEvent) => void
  private onError: (event: Event) => void
  private ws: WebSocket | null = null

  constructor({
    onOpen,
    onClose,
    onMessage,
    onError,
  }: {
    onOpen: () => void
    onClose: () => void
    onMessage: (event: MessageEvent<string>) => void
    onError: (event: Event) => void
  }) {
    this.onOpen = onOpen
    this.onClose = onClose
    this.onMessage = onMessage
    this.onError = onError
  }

  public async connect(path: string): Promise<Error | null> {
    if (!this.ws || this.ws.readyState === WebSocket.CLOSED) {
      const user = store.get(userAtom)
      if (!user) {
        throw new Error('User not found')
      }
      const tokenId = await user.getIdToken()
      if (!tokenId) {
        throw new Error('User not authenticated')
      }
      const url = new URL(path)
      url.searchParams.set('token_id', tokenId)

      // check for permissions
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== Location.PermissionStatus.GRANTED) {
        throw new Error('Location permission not granted')
      }
      const { coords } = await Location.getCurrentPositionAsync()
      url.searchParams.set('lat', coords.latitude.toString())
      url.searchParams.set('lng', coords.longitude.toString())

      this.ws = new WebSocket(url.toString())
      this.ws.onopen = this.onOpen
      this.ws.onclose = this.onClose
      this.ws.onmessage = this.onMessage
      this.ws.onerror = this.onError
      return null
    } else {
      return new Error('WebSocket already connected')
    }
  }

  public async sendMessage(message: UnsignedBaseClientMessage<BaseClientMessage>): Promise<void> {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      throw new Error('WebSocket is not open')
    }
    const user = store.get(userAtom)
    if (!user) {
      throw new Error('User not found')
    }

    const tokenId = await user.getIdToken()
    if (!tokenId) {
      throw new Error('User not authenticated')
    }

    const messageWithTokenId: BaseClientMessage = {
      ...message,
      token_id: tokenId,
    }

    this.ws.send(JSON.stringify(messageWithTokenId))
  }
}

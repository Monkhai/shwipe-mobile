import { useGetUserFriends } from '@/queries/friends/useGetUserFriends'
import { ClientMessageType, CreateSessionWithFriendsMessage, UnsignedBaseClientMessage } from '@/wsHandler/clientMessagesTypes'
import { useWebsocketStore } from '@/zustand/websocketStore'
import React from 'react'
import FriendsListUI from './FriendsListUI'

export default function FriendsList() {
  const { data: friends, isLoading, error } = useGetUserFriends()
  const { sendMessage } = useWebsocketStore()

  const handleStartSessionWithFriend = (friendId: string) => {
    const message: UnsignedBaseClientMessage<CreateSessionWithFriendsMessage> = {
      type: ClientMessageType.CREATE_SESSION_WITH_FRIENDS_MESSAGE_TYPE,
      friend_ids: [friendId],
    }

    sendMessage(message)
  }

  if (isLoading) {
  }

  if (!friends) return null

  return <FriendsListUI friends={friends} onStartSessionWithFriend={handleStartSessionWithFriend} isLoading={isLoading} />
}

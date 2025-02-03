import { FriendRequest } from '@/queries/friendRequests/friendRequestsTypes'
import { atom } from 'jotai'

type UpdateFriendRequestAtom = {
  friendRequest: FriendRequest
  direction: 'sent' | 'received'
}

export const updateFriendRequestAtom = atom<UpdateFriendRequestAtom | null>(null)

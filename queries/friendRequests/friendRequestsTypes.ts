import { User } from '../users/userTypes'

export const GET_SENT_FRIEND_REQUESTS_CFN = 'getSentFriendRequests'
export const GET_RECEIVED_FRIEND_REQUESTS_CFN = 'getReceivedFriendRequests'
export const SEND_FRIEND_REQUEST_CFN = 'sendFriendRequest'
export const UPDATE_FRIEND_REQUEST_STATUS_CFN = 'updateFriendRequest'

export enum FriendRequestsStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  CANCELLED = 'cancelled',
}

export type FriendRequest = Omit<User, 'id'> & {
  request_id: string
  user_id: string
  status: FriendRequestsStatus
}

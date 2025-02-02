export const GET_SENT_FRIEND_REQUESTS_CFN = 'getSentFriendRequests'
export const GET_RECEIVED_FRIEND_REQUESTS_CFN = 'getReceivedFriendRequests'
export const SEND_FRIEND_REQUEST_CFN = 'sendFriendRequest'

export enum FriendRequestsStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}

export type FriendRequest = {
  id: string
  sender_id: string
  receiver_id: string
  status: FriendRequestsStatus
}

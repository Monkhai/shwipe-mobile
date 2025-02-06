import { Location } from './locationTypes'

export enum ClientMessageType {
  UPDATE_INDEX_MESSAGE_TYPE = 'update_index',
  UPDATE_LOCATION_MESSAGE_TYPE = 'update_location',
  START_SESSION_MESSAGE_TYPE = 'start_session',
  CREATE_SESSION_MESSAGE_TYPE = 'create_session',
  CREATE_SESSION_WITH_FRIENDS_MESSAGE_TYPE = 'create_session_with_friends',
  JOIN_SESSION_MESSAGE_TYPE = 'join_session',
  LEAVE_SESSION_MESSAGE_TYPE = 'leave_session',
}

export interface BaseClientMessage {
  type: ClientMessageType
  token_id: string
}

export type UnsignedBaseClientMessage<T extends BaseClientMessage> = Omit<T, 'token_id'>

export interface UpdateIndexMessage extends BaseClientMessage {
  type: ClientMessageType.UPDATE_INDEX_MESSAGE_TYPE
  index: number
  session_id: string
  liked: boolean
}

export interface UpdateLocationMessage extends BaseClientMessage {
  type: ClientMessageType.UPDATE_LOCATION_MESSAGE_TYPE
  location: Location
}

export interface StartSessionMessage extends BaseClientMessage {
  type: ClientMessageType.START_SESSION_MESSAGE_TYPE
  session_id: string
}

export interface CreateSessionMessage extends BaseClientMessage {
  type: ClientMessageType.CREATE_SESSION_MESSAGE_TYPE
}

export interface CreateSessionWithFriendsMessage extends BaseClientMessage {
  type: ClientMessageType.CREATE_SESSION_WITH_FRIENDS_MESSAGE_TYPE
  friend_ids: string[]
}

export interface JoinSessionMessage extends BaseClientMessage {
  type: ClientMessageType.JOIN_SESSION_MESSAGE_TYPE
  session_id: string
}

export interface LeaveSessionMessage extends BaseClientMessage {
  type: ClientMessageType.LEAVE_SESSION_MESSAGE_TYPE
  session_id: string
}

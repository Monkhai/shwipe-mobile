import { Restaurant } from './restaurantTypes'

export enum ServerMessageType {
  ERROR_MESSAGE_TYPE = 'error',
  SESSION_START_MESSAGE_TYPE = 'session_start',
  SESSION_CREATED_MESSAGE_TYPE = 'session_create',
  JOINT_SESSION_MESSAGE_TYPE = 'joint_session',
  UPDATE_RESTAURANTS_MESSAGE_TYPE = 'update_restaurants',
  UPDATE_USER_LIST_MESSAGE_TYPE = 'update_user_list',
  SESSION_CLOSED_MESSAGE_TYPE = 'session_closed',
  REMOVED_FROM_SESSION_MESSAGE_TYPE = 'removed_from_session',
}

export interface SAFE_SessionUser {
  photo_url: string
  user_name: string
}

export interface BaseServerMessage {
  type: ServerMessageType
}

export interface SessionStartMessage extends BaseServerMessage {
  type: ServerMessageType.SESSION_START_MESSAGE_TYPE
  session_id: string
  users: Array<SAFE_SessionUser>
  restaurants: Array<Restaurant>
}

export interface SessionCreatedMessage extends BaseServerMessage {
  type: ServerMessageType.SESSION_CREATED_MESSAGE_TYPE
  session_id: string
  users: Array<SAFE_SessionUser>
}

export interface ServerErrorMessage extends BaseServerMessage {
  type: ServerMessageType.ERROR_MESSAGE_TYPE
  error: string
}

export interface RestaurantUpdateMessage extends BaseServerMessage {
  type: ServerMessageType.UPDATE_RESTAURANTS_MESSAGE_TYPE
  restaurants: Array<Restaurant>
}

export interface JointSessionMessage extends BaseServerMessage {
  type: ServerMessageType.JOINT_SESSION_MESSAGE_TYPE
  session_id: string
  users: Array<SAFE_SessionUser>
  restaurants: Array<Restaurant>
  is_started: boolean
}

export interface UpdateUserListMessage extends BaseServerMessage {
  type: ServerMessageType.UPDATE_USER_LIST_MESSAGE_TYPE
  users: Array<SAFE_SessionUser>
  session_id: string
}

export interface SessionClosedMessage extends BaseServerMessage {
  type: ServerMessageType.SESSION_CLOSED_MESSAGE_TYPE
}

export interface RemovedFromSessionMessage extends BaseServerMessage {
  type: ServerMessageType.REMOVED_FROM_SESSION_MESSAGE_TYPE
}

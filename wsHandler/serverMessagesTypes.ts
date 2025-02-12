import { User } from '@/queries/users/userTypes'
import { Restaurant } from '../queries/restaurants/restaurantTypes'

export enum ServerMessageType {
  LOADING_CONNECTION_MESSAGE_TYPE = 'loading_connection',
  CONNECTION_ESTABLISHED_MESSAGE_TYPE = 'connection_established',
  ERROR_MESSAGE_TYPE = 'error',
  SESSION_START_MESSAGE_TYPE = 'session_start',
  SESSION_CREATED_MESSAGE_TYPE = 'session_create',
  JOINT_SESSION_MESSAGE_TYPE = 'joint_session',
  UPDATE_RESTAURANTS_MESSAGE_TYPE = 'update_restaurants',
  UPDATE_USER_LIST_MESSAGE_TYPE = 'update_user_list',
  SESSION_CLOSED_MESSAGE_TYPE = 'session_closed',
  REMOVED_FROM_SESSION_MESSAGE_TYPE = 'removed_from_session',
  MATCH_FOUND_MESSAGE_TYPE = 'match_found',
}

export interface BaseServerMessage {
  type: ServerMessageType
}

export interface SessionStartMessage extends BaseServerMessage {
  type: ServerMessageType.SESSION_START_MESSAGE_TYPE
  session_id: string
  users: Array<User>
  restaurants: Array<Restaurant>
}

export interface SessionCreatedMessage extends BaseServerMessage {
  type: ServerMessageType.SESSION_CREATED_MESSAGE_TYPE
  session_id: string
  users: Array<User>
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
  users: Array<User>
  restaurants: Array<Restaurant>
  is_started: boolean
}

export interface UpdateUserListMessage extends BaseServerMessage {
  type: ServerMessageType.UPDATE_USER_LIST_MESSAGE_TYPE
  users: Array<User>
  session_id: string
}

export interface SessionClosedMessage extends BaseServerMessage {
  type: ServerMessageType.SESSION_CLOSED_MESSAGE_TYPE
}

export interface RemovedFromSessionMessage extends BaseServerMessage {
  type: ServerMessageType.REMOVED_FROM_SESSION_MESSAGE_TYPE
}

export interface LoadingConnectionMessage extends BaseServerMessage {
  type: ServerMessageType.LOADING_CONNECTION_MESSAGE_TYPE
}

export interface ConnectionEstablishedMessage extends BaseServerMessage {
  type: ServerMessageType.CONNECTION_ESTABLISHED_MESSAGE_TYPE
}

export interface MatchFoundMessage extends BaseServerMessage {
  type: ServerMessageType.MATCH_FOUND_MESSAGE_TYPE
  restaurant_index: number
}

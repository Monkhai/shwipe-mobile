export enum NotificationType {
  FRIEND_REQUEST_SENT = 'friend_request_sent',
  FRIEND_REQUEST_UPDATED = 'friend_request_updated',

  SESSION_INVITATION = 'session_invitation',

  GROUP_INVITATION = 'group_invitation',
}

export interface BaseNotificationData {
  type: NotificationType
}

export interface SessionInvitationNotificationData extends BaseNotificationData {
  type: NotificationType.SESSION_INVITATION
  sessionId: string
}

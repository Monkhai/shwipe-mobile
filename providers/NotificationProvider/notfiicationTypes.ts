export enum NotificationType {
  FRIEND_REQUEST_SENT = 'friend_request_sent',
  FRIEND_REQUEST_UPDATED = 'friend_request_updated',

  SESSION_INVITATION = 'session_invitation',

  GROUP_INVITATION = 'group_invitation',
  GROUP_INVITATION_UPDATED = 'group_invitation_updated',
}

export const invisibleNotificationTypes = [
  NotificationType.FRIEND_REQUEST_SENT,
  NotificationType.FRIEND_REQUEST_UPDATED,
  NotificationType.SESSION_INVITATION,
  NotificationType.GROUP_INVITATION,
  NotificationType.GROUP_INVITATION_UPDATED,
]

export interface BaseNotificationData {
  type: NotificationType
}

export interface SessionInvitationNotificationData extends BaseNotificationData {
  type: NotificationType.SESSION_INVITATION
  sessionId: string
}

export interface GroupInvitationNotificationData extends BaseNotificationData {
  type: NotificationType.GROUP_INVITATION
  groupId: string
}

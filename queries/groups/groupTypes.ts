import { User } from '../users/userTypes'

export const GET_GROUPS_CFN = 'getUserGroups'
export const GET_GROUP_INVITATIONS_CFN = 'getGroupInvitations'
export const CREATE_NEW_GROUP_CFN = 'insertGroup'
export const SEND_GROUP_INVITATION_CFN = 'sendGroupInvitation'

export type Group = {
  id: string
  name: string
  members: User[]
}

export enum GroupInvitationStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  CANCELLED = 'cancelled',
}

export type GroupInvitation = Group & {
  invitation_id: string
  status: GroupInvitationStatus
  members: Array<User>
}

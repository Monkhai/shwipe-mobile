import { User } from '../users/userTypes'

export const GET_GROUPS_CFN = 'getUserGroups'
export const GET_GROUP_INVITATIONS_CFN = 'getGroupInvitations'
export const CREATE_NEW_GROUP_CFN = 'insertGroup'
export const SEND_GROUP_INVITATION_CFN = 'sendGroupInvitation'
export const CANCEL_GROUP_INVITATION_CFN = 'cancelGroupInvitation'
export const UPDATE_GROUP_INVITATION_CFN = 'updateGroupInvitation'
export const LEAVE_GROUP_CFN = 'leaveGroup'

export type Group = {
  id: string
  name: string
  members: User[]
  pendingMembers: User[]
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

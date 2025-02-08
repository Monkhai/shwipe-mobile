import React from 'react'
import { Redirect, useLocalSearchParams } from 'expo-router'
import { useGetUserFriends } from '@/queries/friends/useGetUserFriends'
import { useSendGroupInvitation } from '@/queries/groups/useSendGroupInvitation'
import { useGetGroup } from '@/queries/groups/useGetGroup'
import LoadingView from '../loading/LoadingView'
import InviteToGroupViewUI from './InviteToGroupViewUI'
import { useCancelGroupInvitation } from '@/queries/groups/useCancelGroupInvitation'

export default function InviteToGroupView() {
  const { group_id } = useLocalSearchParams<{ group_id: string }>()
  const { data: group, isLoading: isGroupLoading } = useGetGroup(group_id)
  const { data: friends, isLoading: friendsLoading } = useGetUserFriends()
  const { mutate: sendGroupInvitation, isPending: isSendGroupInvitationPending } = useSendGroupInvitation()
  const { mutate: cancelGroupInviation, isPending: isCancelGroupInvitationPending } = useCancelGroupInvitation()

  if (!group) {
    return <Redirect href="/+not-found" />
  }

  if (friendsLoading || isGroupLoading) {
    return <LoadingView />
  }

  if (!friends || !group) return null

  const handleInvite = (userId: string) => {
    sendGroupInvitation({ groupId: group_id, userId })
  }

  const handleCancel = (userId: string) => {
    cancelGroupInviation({ groupId: group_id, userId })
  }

  // Filter out friends who are already in the group
  const availableFriends = friends.filter(friend => !group.members.some(member => member.id === friend.id))
  const isPending = isSendGroupInvitationPending || isCancelGroupInvitationPending

  return (
    <InviteToGroupViewUI group={group} friends={availableFriends} onInvite={handleInvite} onCancel={handleCancel} isPending={isPending} />
  )
}

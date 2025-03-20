import { colors } from '@/constants/colors'
import { useGetUserFriends } from '@/queries/friends/useGetUserFriends'
import { useCancelGroupInvitation } from '@/queries/groups/useCancelGroupInvitation'
import { useGetGroup } from '@/queries/groups/useGetGroup'
import { useSendGroupInvitation } from '@/queries/groups/useSendGroupInvitation'
import { BlurView } from 'expo-blur'
import { Redirect } from 'expo-router'
import React from 'react'
import { Platform, useColorScheme, View, ViewStyle } from 'react-native'
import LoadingView from '../loading/LoadingView'
import InviteToGroupViewUI from './InviteToGroupViewUI'

interface Props {
  groupId: string
}
export default function InviteToGroupView({ groupId }: Props) {
  const theme = useColorScheme() ?? 'light'
  const { data: group, isLoading: isGroupLoading } = useGetGroup(groupId)
  const { data: friends, isLoading: friendsLoading } = useGetUserFriends()
  const { mutate: sendGroupInvitation, isPending: isSendGroupInvitationPending } = useSendGroupInvitation()
  const { mutate: cancelGroupInviation, isPending: isCancelGroupInvitationPending } = useCancelGroupInvitation()

  if (!group) {
    return <Redirect href="/+not-found" />
  }

  if (friendsLoading || isGroupLoading) {
    return <LoadingView transparent={false} message="Getting your friends..." />
  }

  if (!friends || !group) return null

  const handleInvite = (userId: string) => {
    sendGroupInvitation({ groupId, userId })
  }

  const handleCancel = (userId: string) => {
    cancelGroupInviation({ groupId, userId })
  }

  // Filter out friends who are already in the group
  const availableFriends = friends.filter(friend => !group.members.some(member => member.id === friend.id))
  const isPending = isSendGroupInvitationPending || isCancelGroupInvitationPending

  const androidStyle: ViewStyle = {
    flex: 1,
    gap: 20,
    padding: 20,
    borderRadius: 32,
    backgroundColor: colors[theme].secondaryBackground,
  }

  if (Platform.OS === 'android') {
    return (
      <InviteToGroupViewUI group={group} friends={availableFriends} onInvite={handleInvite} onCancel={handleCancel} isPending={isPending} />
    )
  }

  const iosStyle: ViewStyle = {
    flex: 1,
    padding: 20,
    gap: 20,
    borderRadius: 32,
    backgroundColor: 'transparent',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  }

  return (
    <InviteToGroupViewUI group={group} friends={availableFriends} onInvite={handleInvite} onCancel={handleCancel} isPending={isPending} />
  )
}
